/**
 * Created by IntelliJ IDEA.
 * User: Ayesha
 * Date: Jan 29, 2011
 * Time: 11:50:52 AM
 * To change this template use File | Settings | File Templates.
 */

var BRUSH_SIZE = 1,
    BRUSH_PRESSURE = 1;

function lightTrail( context, color )
{
	this.init( context, color );
}

lightTrail.prototype =
{
	context: null,

	mouseX: null, mouseY: null,

	painters: null,

	interval: null,

    color:[0,0,0],

	init: function( context, color )
	{
		var scope = this;

		this.context = context;
		this.context.globalCompositeOperation = 'source-over';

        this.mouseX = 400;
		this.mouseY = 400;

        if (!color && color.length != 0){
            this.color = color;
        }// else defaults to RGB 0,0,0

		this.painters = new Array();

		for (var i = 0; i < 50; i++)
		{
			this.painters.push({ dx: 400, dy: 400, ax: 0, ay: 0, div: 0.1, ease: Math.random() * 0.2 + 0.6 });
		}

		this.interval = setInterval( update, 1000/60 );

		function update()
		{
			var i;

			scope.context.lineWidth = BRUSH_SIZE;
			scope.context.strokeStyle = "rgba(" + scope.color[0] + ", " + scope.color[1] + ", " + scope.color[2] + ", " + 0.05 * BRUSH_PRESSURE + ")";

			for (i = 0; i < scope.painters.length; i++)
			{
				scope.context.beginPath();
				scope.context.moveTo(scope.painters[i].dx, scope.painters[i].dy);

				scope.painters[i].dx -= scope.painters[i].ax = (scope.painters[i].ax + (scope.painters[i].dx - scope.mouseX) * scope.painters[i].div) * scope.painters[i].ease;
				scope.painters[i].dy -= scope.painters[i].ay = (scope.painters[i].ay + (scope.painters[i].dy - scope.mouseY) * scope.painters[i].div) * scope.painters[i].ease;
				scope.context.lineTo(scope.painters[i].dx, scope.painters[i].dy);
				scope.context.stroke();
			}
		}
	},

	destroy: function()
	{
		clearInterval(this.interval);
	},

    //coordinates where the player starts
	strokeStart: function( mouseX, mouseY )
	{
		this.mouseX = mouseX;
		this.mouseY = mouseY

		for (var i = 0; i < this.painters.length; i++)
		{
			this.painters[i].dx = mouseX;
			this.painters[i].dy = mouseY;
		}

		this.shouldDraw = true;
	},

    //new coordinates moved to
	stroke: function( mouseX, mouseY )
	{
		this.mouseX = mouseX;
		this.mouseY = mouseY;
	},

    //end
	strokeEnd: function()
	{

	}
}
