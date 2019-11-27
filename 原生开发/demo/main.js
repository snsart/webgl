function initWegGL(canvas){
    var gl=null;
    var msg="your browser dose not support WebGl";
    try{
        gl=canvas.getContext("canvas");
    }catch(e){
        msg=e.toString();
    }

    if(!gl){
        alert(msg);
        throw new Error(msg);
    }
    return gl;
}

function initViewport(gl,canvas){
    gl.viewPort(0,0,canvas.width,canvas.height);
}

function createSquare(gl){
    var vertexBuffer;
    vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    var verts=[
        0.5,    0.5,   0.0,
        -0.5,   0.5,    0.0,
        0.5,    -0.5,   0.0,
        -0.5,   -0.5,   0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW);
    var square={
        uffer:vertexBuffer,
        vertSize:3,
        nVerts:4,
        primtype:gl.TRIANGLE_STRIP;
    }
    return square;
}

var projectionMatrix,modelViewMatrix;
function initMatrices(canvas){
    modelViewMatrix=mat4.create();
    mat4.translate(modelViewMatrix,modelViewMatrix,[0,0,-3.333]);
    projectionMatrix=mat4.create();
    mat4.perspective(projectionMatrix,Math.PI/4,canvas.width/canvas.height,1,10000);
}

//着色器

function createShader(gl,str,type){
    var shader;
    if(type=="fragment"){
        shader=gl.createShader(gl.FRAGMENT_SHADER);
    }else if(type=="vertex"){
        shader=gl.createShader(gl.VERTEX_SHADER);
    }else {
        return null;
    }
    gl.shaderSource(shader,str);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
