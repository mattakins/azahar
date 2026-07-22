//? #version 430 core
layout(location = 0) in vec2 frag_tex_coord;
layout(location = 0) out vec4 color;

layout(binding = 0) uniform sampler2D color_texture;
layout(binding = 1) uniform sampler2D color_texture_r;

uniform vec4 i_resolution;
uniform vec4 o_resolution;
uniform int layer;
uniform float parallax_blend;
uniform vec2 parallax_offset;

void main() {
    const float scale = 1.04;
    vec2 uv = clamp((frag_tex_coord - vec2(0.5)) / scale + vec2(0.5) +
                        vec2(parallax_offset.x, -parallax_offset.y),
                    vec2(0.0), vec2(1.0));
    vec4 left  = texture(color_texture,   uv);
    vec4 right = texture(color_texture_r, uv);
    color = mix(left, right, parallax_blend);
}
