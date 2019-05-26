#version 400

uniform mat4 synth_ProjectionMatrix;

uniform sampler2D ColorTexture;  //! texture["images/earth.jpg"]

layout(triangles) in;
layout(triangle_strip, max_vertices = 8) out;

in vec3 teNormal[3];
in vec2 teTextureCoord[3];

out vec2 gTextureCoord;

void main() {

	//Mapa de desplazamiento

	gTextureCoord = teTextureCoord[0];
	gl_Position = synth_ProjectionMatrix * (gl_in[0].gl_Position +
			vec4(teNormal[0]*(texture(ColorTexture,gTextureCoord).g*0.6 +
					texture(ColorTexture,gTextureCoord).r*0.2), 0.0));
	EmitVertex();


	gTextureCoord = teTextureCoord[1];
	gl_Position = synth_ProjectionMatrix * (gl_in[1].gl_Position +
			vec4(teNormal[1]*(texture(ColorTexture,gTextureCoord).g*0.6 +
					texture(ColorTexture,gTextureCoord).r*0.2), 0.0));
	EmitVertex();


	gTextureCoord = teTextureCoord[2];
	gl_Position = synth_ProjectionMatrix * (gl_in[2].gl_Position +
			vec4(teNormal[2]*(texture(ColorTexture,gTextureCoord).g*0.6 +
					texture(ColorTexture,gTextureCoord).r*0.2), 0.0));
	EmitVertex();

/*
	//Sin mapa de desplazamiento

	gTextureCoord = teTextureCoord[0];
	gl_Position = synth_ProjectionMatrix * gl_in[0].gl_Position;
	EmitVertex();


	gTextureCoord = teTextureCoord[1];
	gl_Position = synth_ProjectionMatrix * gl_in[1].gl_Position;
	EmitVertex();


	gTextureCoord = teTextureCoord[2];
	gl_Position = synth_ProjectionMatrix * gl_in[2].gl_Position;
	EmitVertex();

*/
	EndPrimitive();
}
