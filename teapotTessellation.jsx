"use strict";
//out.println();

Synthclipse.debugMode = true;

Synthclipse.setGLVersion(4, 0);
Synthclipse.load("gl-matrix-min.js");

var vShader = "shaders/tessellation.vert";
var tcShader = "shaders/tessellation.tessctrl";
var teShader = "shaders/tessellation.tesseval";
var gShader = "shaders/tessellation.geom";
var fShader = "shaders/tessellation.frag";


var vertexPositionAttribute = -1;
var vertexNormalAttribute = -1;
var textureCoordAttribute = -1;
var samplerUniform = -1;

var program = null;


var renderable = {};
var modelToRender = null;


function loadTeapot() 
{
	var fileString = Synthclipse.readFile("models/Teapot.json");
	return createTeapot(JSON.parse(fileString));
}

function createTeapot(teapotData) {
	var teapotVertexPositionBuffer = {};
	var teapotVertexNormalBuffer = {};
	var teapotVertexTextureCoordBuffer = {};
	var teapotVertexIndexBuffer = {};

    teapotVertexNormalBuffer.id = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer.id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexNormals), gl.STATIC_DRAW);
    teapotVertexNormalBuffer.itemSize = 3;
    teapotVertexNormalBuffer.numItems = teapotData.vertexNormals.length / 3;

    teapotVertexTextureCoordBuffer.id = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer.id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexTextureCoords), gl.STATIC_DRAW);
    teapotVertexTextureCoordBuffer.itemSize = 2;
    teapotVertexTextureCoordBuffer.numItems = teapotData.vertexTextureCoords.length / 2;

    teapotVertexPositionBuffer.id = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer.id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexPositions), gl.STATIC_DRAW);
    teapotVertexPositionBuffer.itemSize = 3;
    teapotVertexPositionBuffer.numItems = teapotData.vertexPositions.length / 3;

    teapotVertexIndexBuffer.id = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer.id);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(teapotData.indices), gl.STATIC_DRAW);
    teapotVertexIndexBuffer.itemSize = 1;
    teapotVertexIndexBuffer.numItems = teapotData.indices.length;

    return {
    	render: function(program) {
    		gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer.id);
    	    gl.vertexAttribPointer(vertexPositionAttribute, teapotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer.id);
    	    gl.vertexAttribPointer(textureCoordAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer.id);
    	    gl.vertexAttribPointer(vertexNormalAttribute, teapotVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer.id);
    	    gl.drawElements(gl.PATCHES, teapotVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    	}
    };
}



function drawScene() 
{
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	program.use();
	
	applyParameters();
	
	program.applyUniforms();
	
	modelToRender.render(program);
}

function applyParameters() 
{
	var model = modelToRender.obj;
}


function initShaders() 
{
	program = ProgramFactory.createProgram("GLSL testing");

	program.attachShader(vShader);
	program.attachShader(tcShader);
	program.attachShader(teShader);
	program.attachShader(gShader);
	program.attachShader(fShader);
	
	program.link();
	
	vertexPositionAttribute = gl.getAttribLocation(program.id, "aVertexPosition");
    if(vertexPositionAttribute != -1)
    	gl.enableVertexAttribArray(vertexPositionAttribute);
    
    vertexNormalAttribute = gl.getAttribLocation(program.id, "aVertexNormal");
    if(vertexNormalAttribute != -1)
    	gl.enableVertexAttribArray(vertexNormalAttribute);

    textureCoordAttribute = gl.getAttribLocation(program.id, "aTextureCoord");
    if(textureCoordAttribute != -1)
    	gl.enableVertexAttribArray(textureCoordAttribute);
    
    samplerUniform = gl.getUniformLocation(program.id, "ColorTexture");
    
    Synthclipse.createControls(program);
    
    program.loadPreset("Default");
    Synthclipse.loadPreset("Default");
    
	Synthclipse.createScriptControls();
}

renderable.init = function() 
{
	initShaders();
	
	modelToRender = loadTeapot();
	
	
	var sphericalCamera = CameraManager.getSphericalCamera();
	sphericalCamera.setPosition(0.0, 0.0, -6.0);

	CameraManager.useSphericalCamera();
	CameraManager.setZoomFactor(0.4);
	
	gl.enable(gl.DEPTH_TEST);
};

renderable.display = function() 
{	
	drawScene();
};

Synthclipse.setRenderable(renderable);


