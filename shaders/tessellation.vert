#version 400

in vec4 aVertexPosition;
in vec2 aTextureCoord;
in vec3 aVertexNormal;

out vec3 vPosition;
out vec3 vNormal;
out vec2 vTextureCoord;

uniform mat4 synth_ViewMatrix;
uniform mat3 synth_NormalMatrix;

void main() {
    vPosition = (synth_ViewMatrix * aVertexPosition).xyz;
	vNormal = synth_NormalMatrix * aVertexNormal;
	vTextureCoord = aTextureCoord;
}
