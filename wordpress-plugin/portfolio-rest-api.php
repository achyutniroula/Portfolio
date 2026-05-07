<?php
/**
 * Plugin Name: Portfolio REST API Extensions
 * Description: Adds custom REST API endpoints and post types for Shoaib's portfolio
 * Version: 1.0.0
 * Author: Shoaib
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Projects Custom Post Type
 */
function portfolio_register_projects_post_type() {
    $labels = array(
        'name'               => 'Projects',
        'singular_name'      => 'Project',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Project',
        'edit_item'          => 'Edit Project',
        'new_item'           => 'New Project',
        'view_item'          => 'View Project',
        'search_items'       => 'Search Projects',
        'not_found'          => 'No projects found',
        'not_found_in_trash' => 'No projects found in trash'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'projects'),
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'supports'            => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'show_in_rest'        => true,
        'rest_base'           => 'projects',
        'menu_icon'           => 'dashicons-portfolio'
    );

    register_post_type('projects', $args);
}
add_action('init', 'portfolio_register_projects_post_type');

/**
 * Add Custom Fields for Projects
 */
function portfolio_add_project_meta_boxes() {
    add_meta_box(
        'project_details',
        'Project Details',
        'portfolio_project_meta_box_callback',
        'projects',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'portfolio_add_project_meta_boxes');

function portfolio_project_meta_box_callback($post) {
    wp_nonce_field('portfolio_save_project_meta', 'portfolio_project_nonce');
    
    $project_url = get_post_meta($post->ID, 'project_url', true);
    $github_url = get_post_meta($post->ID, 'github_url', true);
    $technologies = get_post_meta($post->ID, 'technologies', true);
    ?>
    <p>
        <label for="project_url"><strong>Project URL:</strong></label><br>
        <input type="url" id="project_url" name="project_url" value="<?php echo esc_attr($project_url); ?>" style="width:100%;">
    </p>
    <p>
        <label for="github_url"><strong>GitHub URL:</strong></label><br>
        <input type="url" id="github_url" name="github_url" value="<?php echo esc_attr($github_url); ?>" style="width:100%;">
    </p>
    <p>
        <label for="technologies"><strong>Technologies (comma-separated):</strong></label><br>
        <input type="text" id="technologies" name="technologies" value="<?php echo esc_attr($technologies); ?>" style="width:100%;">
        <em>Example: Firebase, Python, React, Node.js</em>
    </p>
    <?php
}

function portfolio_save_project_meta($post_id) {
    if (!isset($_POST['portfolio_project_nonce']) || 
        !wp_verify_nonce($_POST['portfolio_project_nonce'], 'portfolio_save_project_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['project_url'])) {
        update_post_meta($post_id, 'project_url', sanitize_text_field($_POST['project_url']));
    }

    if (isset($_POST['github_url'])) {
        update_post_meta($post_id, 'github_url', sanitize_text_field($_POST['github_url']));
    }

    if (isset($_POST['technologies'])) {
        update_post_meta($post_id, 'technologies', sanitize_text_field($_POST['technologies']));
    }
}
add_action('save_post_projects', 'portfolio_save_project_meta');

/**
 * Add project meta fields to REST API response
 */
function portfolio_add_project_meta_to_rest() {
    register_rest_field('projects', 'acf', array(
        'get_callback' => function($post) {
            return array(
                'project_url' => get_post_meta($post['id'], 'project_url', true),
                'github_url' => get_post_meta($post['id'], 'github_url', true),
                'technologies' => get_post_meta($post['id'], 'technologies', true),
            );
        },
    ));
}
add_action('rest_api_init', 'portfolio_add_project_meta_to_rest');

/**
 * Register Personal Information Settings
 */
function portfolio_register_settings() {
    register_setting('portfolio_settings', 'personal_phone');
    register_setting('portfolio_settings', 'personal_email');
    register_setting('portfolio_settings', 'personal_linkedin');
    register_setting('portfolio_settings', 'personal_github');
    register_setting('portfolio_settings', 'personal_instagram');
    register_setting('portfolio_settings', 'personal_resume_url');
    register_setting('portfolio_settings', 'personal_bio');
    register_setting('portfolio_settings', 'personal_profile_image');
}
add_action('admin_init', 'portfolio_register_settings');

/**
 * Add Settings Page
 */
function portfolio_add_settings_page() {
    add_options_page(
        'Portfolio Settings',
        'Portfolio Info',
        'manage_options',
        'portfolio-settings',
        'portfolio_settings_page_html'
    );
}
add_action('admin_menu', 'portfolio_add_settings_page');

function portfolio_settings_page_html() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_GET['settings-updated'])) {
        add_settings_error('portfolio_messages', 'portfolio_message', 'Settings Saved', 'updated');
    }

    settings_errors('portfolio_messages');
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('portfolio_settings');
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Phone</th>
                    <td>
                        <input type="text" name="personal_phone" value="<?php echo esc_attr(get_option('personal_phone')); ?>" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">Email</th>
                    <td>
                        <input type="email" name="personal_email" value="<?php echo esc_attr(get_option('personal_email')); ?>" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">LinkedIn URL</th>
                    <td>
                        <input type="url" name="personal_linkedin" value="<?php echo esc_attr(get_option('personal_linkedin')); ?>" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">GitHub URL</th>
                    <td>
                        <input type="url" name="personal_github" value="<?php echo esc_attr(get_option('personal_github')); ?>" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">Instagram URL</th>
                    <td>
                        <input type="url" name="personal_instagram" value="<?php echo esc_attr(get_option('personal_instagram')); ?>" class="regular-text">
                    </td>
                </tr>
                <tr>
                    <th scope="row">Resume URL</th>
                    <td>
                        <input type="text" name="personal_resume_url" value="<?php echo esc_attr(get_option('personal_resume_url')); ?>" class="regular-text">
                        <p class="description">Upload resume to WordPress Media Library and paste URL here</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Profile Image URL</th>
                    <td>
                        <input type="text" name="personal_profile_image" value="<?php echo esc_attr(get_option('personal_profile_image')); ?>" class="regular-text">
                        <p class="description">Upload profile image to Media Library and paste URL here</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Bio</th>
                    <td>
                        <textarea name="personal_bio" rows="5" class="large-text"><?php echo esc_textarea(get_option('personal_bio')); ?></textarea>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings'); ?>
        </form>
    </div>
    <?php
}

/**
 * Register REST API Endpoint for Personal Info
 */
function portfolio_register_personal_info_endpoint() {
    register_rest_route('wp/v2', '/personal-info', array(
        'methods' => 'GET',
        'callback' => 'portfolio_get_personal_info',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'portfolio_register_personal_info_endpoint');

function portfolio_get_personal_info() {
    return array(
        'phone' => get_option('personal_phone', ''),
        'email' => get_option('personal_email', ''),
        'linkedin' => get_option('personal_linkedin', ''),
        'github' => get_option('personal_github', ''),
        'instagram' => get_option('personal_instagram', ''),
        'resume_url' => get_option('personal_resume_url', ''),
        'bio' => get_option('personal_bio', ''),
        'profile_image' => get_option('personal_profile_image', ''),
    );
}

/**
 * Enable CORS for REST API
 */
function portfolio_add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('rest_api_init', 'portfolio_add_cors_headers');
