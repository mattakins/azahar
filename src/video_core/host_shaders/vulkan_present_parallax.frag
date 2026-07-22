// Copyright Citra Emulator Project / Azahar Emulator Project
// Licensed under GPLv2 or any later version
// Refer to the license.txt file included.

#version 450 core
#extension GL_ARB_separate_shader_objects : enable

layout (location = 0) in vec2 frag_tex_coord;
layout (location = 0) out vec4 color;

layout (push_constant, std140) uniform DrawInfo {
    mat4 modelview_matrix;
    vec4 i_resolution;
    vec4 o_resolution;
    int screen_id_l;
    int screen_id_r;
    int layer;
    int reverse_interlaced;
    float parallax_blend;
    float parallax_offset_x;
    float parallax_offset_y;
};

layout (set = 0, binding = 0) uniform sampler2D screen_textures[3];

vec4 GetScreen(int screen_id, vec2 uv) {
#ifdef ARRAY_DYNAMIC_INDEX
    return texture(screen_textures[screen_id], uv);
#else
    switch (screen_id) {
    case 0:
        return texture(screen_textures[0], uv);
    case 1:
        return texture(screen_textures[1], uv);
    case 2:
        return texture(screen_textures[2], uv);
    }
#endif
}

void main() {
    const float scale = 1.04;
    vec2 offset = vec2(parallax_offset_x, -parallax_offset_y);
    vec2 uv = clamp((frag_tex_coord - vec2(0.5)) / scale + vec2(0.5) + offset,
                    vec2(0.0), vec2(1.0));
    color = mix(GetScreen(screen_id_l, uv), GetScreen(screen_id_r, uv), parallax_blend);
}
