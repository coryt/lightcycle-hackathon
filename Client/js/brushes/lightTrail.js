/**
 * Created by IntelliJ IDEA.
 * User: Ayesha
 * Date: Jan 29, 2011
 * Time: 11:50:52 AM
 * To change this template use File | Settings | File Templates.
 */

var BRUSH_SIZE = 5,
    BRUSH_PRESSURE = 1;

function lightTrail( context, color )
{
	this.init( context, color );
}

lightTrail.prototype =
{
	context: null,

	positionX: null, positionY: null,

	painters: null,

	interval: null,

    //173-216-230 light blue
    color:[173,216,230],

    lightCycle: new Image() ,

    angle: 0,

	init: function( context, color )
	{
		var scope = this;
        scope.lightCycle.src = "images/lightcycle.png";
		this.context = context;
		this.context.globalCompositeOperation = 'source-over';

        this.positionX = 400;
		this.positionY = 400;

        if (!color && color.length != 0){
            scope.color = color;
        }// else defaults to light blue

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

				scope.painters[i].dx -= scope.painters[i].ax = (scope.painters[i].ax + (scope.painters[i].dx - scope.positionX) * scope.painters[i].div) * scope.painters[i].ease;
				scope.painters[i].dy -= scope.painters[i].ay = (scope.painters[i].ay + (scope.painters[i].dy - scope.positionY) * scope.painters[i].div) * scope.painters[i].ease;
				scope.context.lineTo(scope.painters[i].dx, scope.painters[i].dy);
				scope.context.stroke();
                scope.context.closePath();
			}

			context.save();
			context.translate(this.positionX, this.positionY);
			context.rotate(scope.angle);
            scope.context.drawImage(scope.lightCycle, 0,  0, 33.33, 12.66);
			context.restore();
		}
	},
	
	determineAngle:function(x1,y1,x2,y2)
	{
		var dx = x2-x1;
		var dy = y2-y1;
		var angle = 0;
		if (dx == 0)
		{
			angle=dy>0?Math.PI/2:Math.PI*3/2;
		}
		else if (dy == 0)
		{
			angle=dx>0?0:Math.PI;
		}
		else
		{
			angle=Math.asin(dy/dx);
		}
		return angle;
	},

	destroy: function()
	{
		clearInterval(this.interval);
	},

    //coordinates where the player starts
	strokeStart: function( positionX, positionY )
	{
		this.positionX = positionX;
		this.positionY = positionY;

		for (var i = 0; i < this.painters.length; i++)
		{
			this.painters[i].dx = positionX;
			this.painters[i].dy = positionY;
		}

		this.shouldDraw = true;
	},

    //new coordinates moved to
	stroke: function( positionX, positionY )
	{
        var angle = this.determineAngle(this.positionX, this.positionY, positionX, positionY);

        if ((angle > 0 && angle <= 90) || (angle > 135 && angle <= 180)){
            BRUSH_PRESSURE = 30;
        }else if((angle > 90 && angle <= 135) || (angle > 180 && angle < 360)){
            BRUSH_PRESSURE = 15;
        }else{
            //angle is 0 or 360
            BRUSH_PRESSURE = 1;
        }

		this.positionX = positionX;
		this.positionY = positionY;
        this.angle = angle;

	},

    //end
	strokeEnd: function()
	{

	}
}
