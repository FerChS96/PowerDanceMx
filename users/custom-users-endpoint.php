<?php
/**
 * Plugin Name: Custom Users API Endpoint
 * Description: Exposes a paginated REST API endpoint for users.
 * Version: 1.1
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Hook para registrar el endpoint cuando la API REST está lista
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/users', array(
        'methods'             => 'GET',
        'callback'            => 'custom_users_endpoint',
        'permission_callback' => '__return_true', // Público como solicitaste
        'args'                => array(
            'page'      => array(
                'description'       => 'Current page of the collection',
                'type'              => 'integer',
                'default'           => 1,
                'minimum'           => 1,
                'validate_callback' => function ($param) {
                    return is_numeric($param) && $param > 0;
                },
                'sanitize_callback' => 'absint',
            ),
            'per_page'  => array(
                'description'       => 'Maximum number of items to be returned per page',
                'type'              => 'integer',
                'default'           => 20,
                'minimum'           => 1,
                'maximum'           => 100,
                'validate_callback' => function ($param) {
                    return is_numeric($param) && $param > 0 && $param <= 100;
                },
                'sanitize_callback' => 'absint',
            ),
            'search'    => array(
                'description'       => 'Limit results to those matching a string',
                'type'              => 'string',
                'validate_callback' => function ($param) {
                    return is_string($param) && strlen($param) <= 200;
                },
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'orderby'   => array(
                'description'       => 'Sort collection by object attribute',
                'type'              => 'string',
                'default'           => 'registered',
                'enum'              => ['id', 'name', 'email', 'registered'],
                'validate_callback' => function ($param) {
                    $allowed = ['id', 'name', 'email', 'registered'];
                    return in_array($param, $allowed, true);
                },
                'sanitize_callback' => 'sanitize_key',
            ),
            'order'     => array(
                'description'       => 'Order sort attribute ascending or descending',
                'type'              => 'string',
                'default'           => 'DESC',
                'enum'              => ['ASC', 'DESC'],
                'validate_callback' => function ($param) {
                    return in_array(strtoupper($param), ['ASC', 'DESC'], true);
                },
                'sanitize_callback' => function ($param) {
                    return strtoupper(sanitize_text_field($param));
                },
            ),
        ),
    ));
});

/**
 * Callback del endpoint: /wp-json/custom/v1/users
 * 
 * @param WP_REST_Request $request
 * @return WP_REST_Response|WP_Error
 */
function custom_users_endpoint($request) {
    global $wpdb;

    try {
        // Obtener y validar parámetros
        $page     = $request->get_param('page') ?: 1;
        $per_page = $request->get_param('per_page') ?: 20;
        $search   = $request->get_param('search');
        $orderby  = $request->get_param('orderby') ?: 'registered';
        $order    = $request->get_param('order') ?: 'DESC';

        // Validar límites de paginación
        if ($per_page > 100) {
            $per_page = 100;
        }
        if ($page < 1) {
            $page = 1;
        }

        // Mapeo seguro de campos para ordenamiento
        $order_mapping = array(
            'id'         => 'ID',
            'name'       => 'user_login',
            'email'      => 'user_email',
            'registered' => 'user_registered',
        );

        // Validar campo de ordenamiento
        if (!array_key_exists($orderby, $order_mapping)) {
            return new WP_Error(
                'invalid_orderby',
                'Invalid orderby parameter',
                array('status' => 400)
            );
        }

        $order_field = $order_mapping[$orderby];
        $order_dir   = strtoupper($order) === 'ASC' ? 'ASC' : 'DESC';

        // Construir consulta base
        $query = "
            SELECT 
                ID,
                user_login,
                user_email,
                user_registered
            FROM {$wpdb->users}
        ";

        // Construir consulta de conteo
        $count_query = "SELECT COUNT(*) FROM {$wpdb->users}";

        // Condiciones de búsqueda
        $where_parts = array();
        $prepare_args = array();

        if (!empty($search)) {
            $search_term = '%' . $wpdb->esc_like($search) . '%';
            
            $where_parts[] = "
                (user_login LIKE %s 
                OR user_email LIKE %s)
            ";
            
            // Agregar el término de búsqueda para cada campo
            $prepare_args = array_merge($prepare_args, array($search_term, $search_term));
        }

        // Agregar WHERE si hay condiciones
        if (!empty($where_parts)) {
            $where_clause = ' WHERE ' . implode(' AND ', $where_parts);
            $query .= $where_clause;
            $count_query .= $where_clause;
        }

        // Obtener total de usuarios primero
        if (!empty($prepare_args)) {
            $total_users = $wpdb->get_var($wpdb->prepare($count_query, $prepare_args));
        } else {
            $total_users = $wpdb->get_var($count_query);
        }

        if ($total_users === null) {
            throw new Exception('Error al contar usuarios');
        }

        $total_users = (int) $total_users;
        $total_pages = ceil($total_users / $per_page);

        // Validar que la página solicitada existe
        if ($page > $total_pages && $total_pages > 0) {
            $page = $total_pages;
        }

        // Agregar ORDER BY y LIMIT a la consulta principal
        $offset = ($page - 1) * $per_page;
        $query .= " ORDER BY {$order_field} {$order_dir}";
        $query .= $wpdb->prepare(" LIMIT %d OFFSET %d", $per_page, $offset);

        // Ejecutar consulta principal
        if (!empty($prepare_args)) {
            $final_args = array_merge($prepare_args, array($per_page, $offset));
            $results = $wpdb->get_results($wpdb->prepare($query, $final_args));
        } else {
            $results = $wpdb->get_results($wpdb->prepare($query, $per_page, $offset));
        }

        if ($results === null) {
            throw new Exception('Error al obtener usuarios');
        }

        // Formatear respuesta
        $users_array = array();
        foreach ($results as $user) {
            $users_array[] = array(
                'id'    => (int) $user->ID,
                'name'  => sanitize_text_field($user->user_login),
                'email' => sanitize_email($user->user_email),
                'date'  => mysql_to_rfc3339($user->user_registered),
            );
        }

        // Crear respuesta
        $response = rest_ensure_response($users_array);

        // Agregar headers de paginación
        $response->header('X-WP-Total', $total_users);
        $response->header('X-WP-TotalPages', $total_pages);
        $response->header('X-WP-Page', $page);
        $response->header('X-WP-PerPage', $per_page);

        // Headers CORS para permitir acceso a headers personalizados
        $response->header('Access-Control-Expose-Headers', 'X-WP-Total, X-WP-TotalPages, X-WP-Page, X-WP-PerPage');

        return $response;

    } catch (Exception $e) {
        error_log('Custom Users API Error: ' . $e->getMessage());
        
        return new WP_Error(
            'users_fetch_error',
            'Error al obtener usuarios. Por favor, inténtelo de nuevo.',
            array('status' => 500)
        );
    }
}

/**
 * Función auxiliar para validar que un campo de ordenamiento es seguro
 * 
 * @param string $field
 * @return bool
 */
function is_valid_order_field($field) {
    $allowed_fields = [
        'ID',
        'user_login',
        'user_email',
        'user_registered'
    ];
    
    return in_array($field, $allowed_fields, true);
}

/**
 * Hook para agregar headers CORS si es necesario
 */
add_action('rest_pre_serve_request', function($served, $result, $request, $server) {
    if (strpos($request->get_route(), '/custom/v1/users') !== false) {
        // Permitir CORS para el endpoint de usuarios
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
    return $served;
}, 10, 4);