#version 400

uniform sampler2D ColorTexture;//! texture["images/earth.jpg"]

out vec4 FragColor;

in vec2 gTextureCoord;

void main() {

	FragColor = texture2D(ColorTexture,
			vec2(gTextureCoord.s, gTextureCoord.t));
}
