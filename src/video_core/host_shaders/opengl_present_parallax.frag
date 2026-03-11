//? #version 430 core
layout(location = 0) in vec2 frag_tex_coord;
layout(location = 0) out vec4 color;

layout(binding = 0) uniform sampler2D color_texture;
layout(binding = 1) uniform sampler2D color_texture_r;

uniform vec4 i_resolution;
uniform vec4 o_resolution;
uniform int layer;
uniform float parallax_blend;

void main() {
    vec4 left  = texture(color_texture,   frag_tex_coord);
    vec4 right = texture(color_texture_r, frag_tex_coord);
    color = mix(left, right, parallax_blend);
}
