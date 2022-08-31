import React, { useEffect, useState, KeyboardEvent } from 'react';

// Images
// import BackgroundImage from '../../assets/images/network_texture_red_700.png';
import BackgroundImage from '../../assets/images/SapienElevenGym.png';
import BubbleImage from '../../assets/images/BubblesRed.png';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';
import { Point } from 'recharts/types/shape/Curve';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
    fontFamily: 'besan',
    textAlign: 'center',
}));

const StyledMintButton = styled(Button)(({theme}) =>({
    minWidth: 150,
    fontWeight: 600,
    margin: `${theme.spacing(3)} 0 0`,
    marginLeft:'auto',
    borderColor: 'white',
    color: 'white',
    minHeight:40,

    // [theme.breakpoints.down('md')]: {
    //     padding: 3,
    //     minHeight: 20,
    //     minWidth: 60,
    // },

}));


const BannerBackgroundBox = styled(Box)(({ theme }) => ({
    width: '100%',
    // padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    background: `url(${BackgroundImage})`,
    // borderBottom:  `5px solid ${theme.palette.primary.main}`,
    backgroundSize: 'contain',
    height: '90vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
        // paddingTop: theme.spacing(19),
        height: '60vh'
    },
    [theme.breakpoints.down('md')]: {
        // paddingTop: theme.spacing(19),
        height: '30vh'
    },
}));

type PointXY = {
    'x': number,
    'y': number,
};

const PACMAN_FPS = 30;
const PACMAN_WALL    = 0;
const PACMAN_BISCUIT = 1;
const PACMAN_EMPTY   = 2;
const PACMAN_BLOCK   = 3;
const PACMAN_PILL    = 4;

const PACMAN_LIVES = 1;

const MAX_STACK_SIZE = 500000; 
// Maximum call stack size var 
var stackSize = 0; 

var NONE        = 4,
    UP          = 3,
    LEFT        = 2,
    DOWN        = 1,
    RIGHT       = 11,
    WAITING     = 5,
    PAUSE       = 6,
    PLAYING     = 7,
    COUNTDOWN   = 8,
    EATEN_PAUSE = 9,
    DYING       = 10,
    COMPLETED       = 100

/* Human readable keyCode index */
var KEY = {'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222,'N': 78, 'P': 80, 'S':115};

class GhostClass {

    length: number | undefined;

    position: PointXY;
    direction = 0;
    eatable = -1;
    eaten = -1;
    due = 0;

    game: any;
    map: Map;
    colour: any;

    constructor(_game: any, _map: Map, _colour: any){
        this.position = {x:0,y:0};
        this.game = _game;
        this.map = _map;
        this.colour = _colour;
    }

    getNewCoord(dir:number, current: PointXY) { 
        
        var speed  = this.isVunerable() ? 1 : this.isHidden() ? 4 : 2,
            xSpeed = (dir === LEFT && -speed || dir === RIGHT && speed || 0),
            ySpeed = (dir === DOWN && speed || dir === UP && -speed || 0);
        // console.log("x-speed: " + xSpeed + ", y-speed: " + ySpeed);
        return {
            "x": this.addBounded(current.x, xSpeed),
            "y": this.addBounded(current.y, ySpeed)
        };
    };
    addBounded(x1: number, x2: number) { 
        var rem    = x1 % 10, 
            result = rem + x2;
        if (rem !== 0 && result > 10) {
            return x1 + (10 - rem);
        } else if(rem > 0 && result < 0) { 
            return x1 - rem;
        }
        return x1 + x2;
    };
    
    isVunerable() { 
        return this.eatable != -1;
    };
    
    isDangerous() {
        return this.eaten == -1;
    };

    isHidden() { 
        return this.eatable == -1 && this.eaten != -1;
    };
    
    getRandomDirection() {
        var moves = (this.direction === LEFT || this.direction === RIGHT) 
            ? [UP, DOWN] : [LEFT, RIGHT];
        return moves[Math.floor(Math.random() * 2)];
    };
    
    reset() {
        this.eaten = -1;
        this.eatable = -1;
        this.position = {"x": 90, "y": 80};
        this.direction = this.getRandomDirection();
        this.due = this.getRandomDirection();
    };
    
    onWholeSquare(x: number) {
        return x % 10 === 0;
    };
    
    oppositeDirection(dir: number) { 
        return dir === LEFT && RIGHT ||
            dir === RIGHT && LEFT ||
            dir === UP && DOWN || UP;
    };

    makeEatable() {
        this.direction = this.oppositeDirection(this.direction);
        this.eatable = this.game.getTick();
    };

    eat() { 
        this.eatable = -1;
        this.eaten = this.game.getTick();
    };

    pointToCoord(x: number) {
        return Math.round(x / 10);
    };

    nextSquare(x: number, dir: number) {
        var rem = x % 10;
        if (rem === 0) { 
            return x; 
        } else if (dir === RIGHT || dir === DOWN) { 
            return x + (10 - rem);
        } else {
            return x - rem;
        }
    };

    onGridSquare(pos: Point) {
        return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
    };

    secondsAgo(tick: number) { 
        return (this.game.getTick() - tick) / PACMAN_FPS;
    };

    getColour() { 
        if (this.eatable>-1) { 
            if (this.secondsAgo(this.eatable) > 5) { 
                return this.game.getTick() % 20 > 10 ? "#FFFFFF" : "#0000BB";
            } else { 
                return "#0000BB";
            }
        } else if(this.eaten>-1) { 
            return "#222";
        } 
        return this.colour;
    };

    draw(ctx: CanvasRenderingContext2D) {
  
        var s    = this.map.blockSize, 
            top  = (this.position.y/10) * s,
            left = (this.position.x/10) * s;
    
            // console.log("--cc--" + s);
        if (this.eatable>-1 && this.secondsAgo(this.eatable) > 8) {
            this.eatable = -1;
        }
        
        if (this.eaten>-1 && this.secondsAgo(this.eaten) > 3) { 
            this.eaten = -1;
        }
        
        var tl = left + s;
        var base = top + s - 3;
        var inc = s / 10;

        var high = this.game.getTick() % 10 > 5 ? 3  : -3;
        var low  = this.game.getTick() % 10 > 5 ? -3 : 3;

        // console.log("tick---"+this.game.getTick());
        ctx.fillStyle = this.getColour();
        // console.log(this.getColour());
        ctx.beginPath();

        ctx.moveTo(left, base);

        ctx.quadraticCurveTo(left, top, left + (s/2),  top);
        ctx.quadraticCurveTo(left + s, top, left+s,  base);
        
        // Wavy things at the bottom
        ctx.quadraticCurveTo(tl-(inc*1), base+high, tl - (inc * 2),  base);
        ctx.quadraticCurveTo(tl-(inc*3), base+low, tl - (inc * 4),  base);
        ctx.quadraticCurveTo(tl-(inc*5), base+high, tl - (inc * 6),  base);
        ctx.quadraticCurveTo(tl-(inc*7), base+low, tl - (inc * 8),  base); 
        ctx.quadraticCurveTo(tl-(inc*9), base+high, tl - (inc * 10), base); 

        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.arc(left + 6,top + 6, s / 6, 0, 300, false);
        ctx.arc((left + s) - 6,top + 6, s / 6, 0, 300, false);
        ctx.closePath();
        ctx.fill();

        var f = s / 12;
        var off = [];
        // for(var i=0;i<12;i++){
        //     off[i] = [];
        // }
        off[RIGHT] = [f, 0];
        off[LEFT]  = [-f, 0];
        off[UP]    = [0, -f];
        off[DOWN]  = [0, f];

        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(left+6+off[this.direction][0], top+6+off[this.direction][1], 
                s / 15, 0, 300, false);
        ctx.arc((left+s)-6+off[this.direction][0], top+6+off[this.direction][1], 
                s / 15, 0, 300, false);
        ctx.closePath();
        ctx.fill();

    };

    pane(pos:Point) {

        if (pos.y === 100 && pos.x >= 190 && this.direction === RIGHT) {
            return {"y": 100, "x": -10};
        }
        
        if (pos.y === 100 && pos.x <= -10 && this.direction === LEFT) {
            return this.position = {"y": 100, "x": 190};
        }

        return false;
    };
    
    move(ctx: CanvasRenderingContext2D) : any {
        
        stackSize ++;
        if (stackSize > MAX_STACK_SIZE) { 
            // Check if stack size has been exceeded 
            throw new RangeError("--sapien--Maximum call stack size exceeded"); 
        } 
        
        var oldPos = this.position,
            onGrid = this.onGridSquare(this.position),
            npos: PointXY | null   = null;
            if (this.due !== this.direction) {
            
            npos = this.getNewCoord(this.due, this.position);
            // console.log("npos"+npos.x+" , " + npos.y);
            // console.log("due: "+this.due+" , direction: " + this.direction);
            
            if (onGrid &&
                this.map.isFloorSpace({
                    "y":this.pointToCoord(this.nextSquare(npos.y, this.due)),
                    "x":this.pointToCoord(this.nextSquare(npos.x, this.due))})) {
                this.direction = this.due;
            } else {
                npos = null;
            }
        }
        
        if (npos === null) {
            npos = this.getNewCoord(this.direction, this.position);
        }
        
        if (onGrid &&
            this.map.isWall({
                "y" : this.pointToCoord(this.nextSquare(npos.y, this.direction)),
                "x" : this.pointToCoord(this.nextSquare(npos.x, this.direction))
            })
            ) {
            
            this.due = this.getRandomDirection();            
            return this.move(ctx);
        }

        this.position = npos;        
        
        var tmp = this.pane(this.position);
        if (tmp) { 
            this.position = tmp;
        }
        
        this.due = this.getRandomDirection();
        
        return {
            "new" : this.position,
            "old" : oldPos
        };
    };
}



class User {
    position : PointXY  = {'x':0,'y':0};
    direction = 0;
    eaten     = 0;
    due       = 0; 
    lives     = 0;
    score     = 5;
    keyMap    = [] = new Array();
    map: Map;
    game: any;

    constructor(_game: any){
        this.keyMap[KEY.ARROW_LEFT]  = LEFT;
        this.keyMap[KEY.ARROW_UP]    = UP;
        this.keyMap[KEY.ARROW_RIGHT] = RIGHT;
        this.keyMap[KEY.ARROW_DOWN]  = DOWN;
        var tMap: Map = new Map(17);
        this.map = tMap;
        this.game = _game;
    }


    addScore(nScore: number) { 
        this.score += nScore;
        if (this.score >= 10000 && this.score - nScore < 10000) { 
            this.lives += 1;
        }
    };

    theScore() { 
        return this.score;
    };

    loseLife() { 
        this.lives -= 1;
    };

    getLives() {
        return this.lives;
    };

    initUser() {
        this.score = 0;
        this.lives = PACMAN_LIVES;
        this.newLevel();
    }
    
    newLevel() {
        // this.resetPosition();
        this.eaten = 0;
    };
    
    resetPosition() {
        this.position = {"x": 90, "y": 120};
        this.direction = LEFT;
        this.due = LEFT;
    };
    
    reset() {
        this.initUser();
        // this.resetPosition();
        this.map.reset();
        stackSize = 0;
    };        
    
    keyDown(e: any) {
        if (typeof this.keyMap[e.keyCode] !== "undefined") {
            // console.log("--aa--"+e.keyCode); 
            this.due = this.keyMap[e.keyCode];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
	};

    mouseDown(e: any) {
        var offX = Math.abs(e.pageX - e.offsetX);
        var offY = Math.abs(e.pageY - e.offsetY);

        // console.log("OFFsetX: " + offX + " , OffsetY: " + offY);

        if(offX <20 || offY<20) return false;

        var diffX = e.offsetX - this.position.x*1.5*1.1;
        var diffY = e.offsetY - this.position.y*1.5*1.1;
        console.log("Current Posotion: " + this.position.x + " , " + this.position.y);
        console.log("OffsetPosition: " + e.offsetX + " , " + e.offsetY);
        console.log("DiffX,Y: " + diffX + " , " + diffY);
        console.log("OffX,Y: " + offX + " , " + offY);
        // console.log("Page Position: " + e.pageX + " , " + e.pageY);
        // var diffXY = Math.abs(Math.abs(diffX) - offX) - Math.abs(Math.abs(diffY) - offY);
        var diffXY = Math.abs(diffX) - Math.abs(diffY);
        if(diffXY>0){
            if(diffX>0){
                this.due = RIGHT;
                console.log("Right");
            }
            else{
                this.due = LEFT;
                console.log("Left");
            }
        }else{
            if(diffY>0){
                this.due = DOWN;
                console.log("Down");
            }
            else{
                this.due = UP;
                console.log("Up");
            }
        }
        // console.log("Mouse Down ++ " + e.offsetX);
        // console.log("Mouse Down ++ " + e.layerX);
        
        // console.log("Mouse Down ++ " + this.);
        
        // if (typeof this.keyMap[e.keyCode] !== "undefined") {
        //     // console.log("--aa--"+e.keyCode); 
        //     this.due = this.keyMap[e.keyCode];
        //     e.preventDefault();
        //     e.stopPropagation();
        //     return false;
        // }
        return true;
	};

    getNewCoord(dir: number, current: any) {   
        return {
            "x": current.x + (dir === LEFT && -2 || dir === RIGHT && 2 || 0),
            "y": current.y + (dir === DOWN && 2 || dir === UP    && -2 || 0)
        };
    };

    onWholeSquare(x: number) {
        return x % 10 === 0;
    };

    pointToCoord(x: number) {
        return Math.round(x/10);
    };
    
    nextSquare(x: number, dir: number) {
        var rem = x % 10;
        if (rem === 0) { 
            return x; 
        } else if (dir === RIGHT || dir === DOWN) { 
            return x + (10 - rem);
        } else {
            return x - rem;
        }
    };

    next(pos: Point, dir: number) {
        return {
            "y" : this.pointToCoord(this.nextSquare(pos.y, dir)),
            "x" : this.pointToCoord(this.nextSquare(pos.x, dir)),
        };                               
    };

    onGridSquare(pos: PointXY) {
        return this.onWholeSquare(pos.y) && this.onWholeSquare(pos.x);
    };

    isOnSamePlane(due: number, dir: number) { 
        return ((due === LEFT || due === RIGHT) && 
                (dir === LEFT || dir === RIGHT)) || 
            ((due === UP || due === DOWN) && 
             (dir === UP || dir === DOWN));
    };

    move(ctx: CanvasRenderingContext2D) {
        
        var npos        = null, 
            nextWhole   = null, 
            oldPosition = this.position,
            block       = null;
        
        if (this.due !== this.direction) {
            npos = this.getNewCoord(this.due, this.position);
            
            if (this.isOnSamePlane(this.due, this.direction) || 
                (this.onGridSquare(this.position) && 
                 this.map.isFloorSpace(this.next(npos, this.due)))) {
                    this.direction = this.due;
            } else {
                npos = null;
            }
        }

        if (npos === null) {
            npos = this.getNewCoord(this.direction, this.position);
        }
        
        if (this.onGridSquare(this.position) && this.map.isWall(this.next(npos, this.direction))) {
            this.direction = NONE;
        }

        if (this.direction === NONE) {
            return {"new" : this.position, "old" : this.position};
        }
        
        if (npos.y === 100 && npos.x >= 190 && this.direction === RIGHT) {
            npos = {"y": 100, "x": -10};
        }
        
        if (npos.y === 100 && npos.x <= -12 && this.direction === LEFT) {
            npos = {"y": 100, "x": 190};
        }
        
        this.position = npos;        
        nextWhole = this.next(this.position, this.direction);
        
        block = this.map.block(nextWhole);        
        
        if ((this.isMidSquare(this.position.y) || this.isMidSquare(this.position.x)) &&
            block === PACMAN_BISCUIT || block === PACMAN_PILL) {
            
            this.map.setBlock(nextWhole, PACMAN_EMPTY);           
            this.addScore((block === PACMAN_BISCUIT) ? 10 : 50);
            this.eaten += 1;
            
            if (this.eaten === 182) {
            // if (this.eaten === 1) {
                this.game.completedLevel();
            }
            
            if (block === PACMAN_PILL) { 
                this.game.eatenPill();
            }
        }   
                
        return {
            "new" : this.position,
            "old" : oldPosition
        };
    };

    isMidSquare(x: number) { 
        var rem = x % 10;
        return rem > 3 || rem < 7;
    };

    calcAngle(dir: number, pos: PointXY) { 
        if (dir == RIGHT && (pos.x % 10 < 5)) {
            return {"start":0.25, "end":1.75, "direction": false};
        } else if (dir === DOWN && (pos.y % 10 < 5)) { 
            return {"start":0.75, "end":2.25, "direction": false};
        } else if (dir === UP && (pos.y % 10 < 5)) { 
            return {"start":1.25, "end":1.75, "direction": true};
        } else if (dir === LEFT && (pos.x % 10 < 5)) {             
            return {"start":0.75, "end":1.25, "direction": true};
        }
        return {"start":0, "end":2, "direction": false};
    };

    drawDead(ctx: CanvasRenderingContext2D, amount: number) { 

        var size = this.map.blockSize, 
            half = size / 2;

        if (amount >= 1) { 
            return;
        }

        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();        
        ctx.moveTo(((this.position.x/10) * size) + half, 
                   ((this.position.y/10) * size) + half);
        
        ctx.arc(((this.position.x/10) * size) + half, 
                ((this.position.y/10) * size) + half,
                half, 0, Math.PI * 2 * amount, true); 
        
        ctx.fill();    
    };

    draw(ctx: CanvasRenderingContext2D) { 

        var s = this.map.blockSize, 
            angle = this.calcAngle(this.direction, this.position);

        ctx.fillStyle = "#FFFF00";

        ctx.beginPath();        

        ctx.moveTo(((this.position.x/10) * s) + s / 2,
                   ((this.position.y/10) * s) + s / 2);
        
        ctx.arc(((this.position.x/10) * s) + s / 2,
                ((this.position.y/10) * s) + s / 2,
                s / 2, Math.PI * angle.start, 
                Math.PI * angle.end, angle.direction); 
        
        ctx.fill();    
    };
    
    // this.initUser();

}

// Pacman.User = function (game, map) {
    
    


//     return {
//         "draw"          : draw,
//         "drawDead"      : drawDead,
//         "loseLife"      : loseLife,
//         "getLives"      : getLives,
//         "score"         : score,
//         "addScore"      : addScore,
//         "theScore"      : theScore,
//         "keyDown"       : keyDown,
//         "move"          : move,
//         "newLevel"      : newLevel,
//         "reset"         : reset,
//         "resetPosition" : resetPosition
//     };
// };

class Map {

    height    = 0; 
    width     = 0; 
    blockSize = 0;
    pillSize  = 0;
    map :number[][];

    constructor(size: number){
        this.blockSize = size;
        this.map = new Array(Array());
    }
    
    withinBounds(y: number, x: number) {
        return y >= 0 && y < this.height && x >= 0 && x < this.width;
    }
    
    isWall(pos: Point) {
        return this.withinBounds(pos.y, pos.x) && this.map[pos.y][pos.x] === PACMAN_WALL;
    }
    
    isFloorSpace(pos: Point) {
        if (!this.withinBounds(pos.y, pos.x)) {
            return false;
        }
        var peice = this.map[pos.y][pos.x];
        return peice === PACMAN_EMPTY || 
            peice === PACMAN_BISCUIT ||
            peice === PACMAN_PILL;
    }
    
    drawWall(ctx: CanvasRenderingContext2D) {

        var i, j, p, line;
        
        ctx.strokeStyle = "#0000FF";
        ctx.lineWidth   = 7;
        ctx.lineCap     = "round";
        
        for (i = 0; i < PACMAN_WALLS.length; i += 1) {
            line = PACMAN_WALLS[i];
            ctx.beginPath();

            for (j = 0; j < line.length; j += 1) {

                p = line[j];
                
                if (p.move) {
                    ctx.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize);
                } else if (p.line) {
                    ctx.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize);
                } else if (p.curve) {
                    ctx.quadraticCurveTo(p.curve[0] * this.blockSize, 
                                         p.curve[1] * this.blockSize,
                                         p.curve[2] * this.blockSize, 
                                         p.curve[3] * this.blockSize);   
                }
            }
            ctx.stroke();
        }
    }
    
    reset() {       
        console.log("--sapien--map reseted");
        // var tMap;
        // this.map    = Array.from(PACMAN_MAP);
        this.map = new Array();
        for(var i=0;i<PACMAN_MAP.length;i++)
        {
            this.map[i] = new Array();
            for(var j=0;j<PACMAN_MAP[i].length;j++)
            {
                this.map[i][j] = PACMAN_MAP[i][j];
            }
        }
        this.height = this.map.length;
        this.width  = this.map[0].length;
        return;        
    };

    block(pos: PointXY) {
        return this.map[pos.y][pos.x];
    };
    
    setBlock(pos: PointXY, type: any) {
        this.map[pos.y][pos.x] = type;
        // console.log("original: " + PACMAN_MAP[pos.y][pos.x]);
        // console.log("posX: " + pos.x + " , posY: "+pos.y);
        // console.log("current: " + type);
    };

    drawPills(ctx: CanvasRenderingContext2D) { 

        if (++this.pillSize > 30) {
            this.pillSize = 0;
        }
        
        for (var i = 0; i < this.height; i += 1) {
		    for (var j = 0; j < this.width; j += 1) {
                if (this.map[i][j] === PACMAN_PILL) {
                    ctx.beginPath();

                    ctx.fillStyle = "#000";
		            ctx.fillRect((j * this.blockSize), (i * this.blockSize), 
                                 this.blockSize, this.blockSize);

                    ctx.fillStyle = "#FFF";
                    ctx.arc((j * this.blockSize) + this.blockSize / 2,
                            (i * this.blockSize) + this.blockSize / 2,
                            Math.abs(5 - (this.pillSize/3)), 
                            0, 
                            Math.PI * 2, false); 
                    ctx.fill();
                    ctx.closePath();
                }
		    }
	    }
    };
    
    draw(ctx: CanvasRenderingContext2D) {
        
        var i, j, size = this.blockSize;

        ctx.fillStyle = "#000";
	    ctx.fillRect(0, 0, this.width * size, this.height * size);

        this.drawWall(ctx);
        
        for (i = 0; i < this.height; i += 1) {
		    for (j = 0; j < this.width; j += 1) {
			    this.drawBlock(i, j, ctx);
		    }
	    }
    };
    
    drawBlock(y: number, x: number, ctx: CanvasRenderingContext2D) {

        var layout = this.map[y][x];

        if (layout === PACMAN_PILL) {
            return;
        }

        ctx.beginPath();
        
        if (layout === PACMAN_EMPTY || layout === PACMAN_BLOCK || 
            layout === PACMAN_BISCUIT) {
            
            ctx.fillStyle = "#000";
		    ctx.fillRect((x * this.blockSize), (y * this.blockSize), 
                         this.blockSize, this.blockSize);

            if (layout === PACMAN_BISCUIT) {
                ctx.fillStyle = "#FFF";
		        ctx.fillRect((x * this.blockSize) + (this.blockSize / 2.5), 
                             (y * this.blockSize) + (this.blockSize / 2.5), 
                             this.blockSize / 6, this.blockSize / 6);
	        }
        }
        ctx.closePath();	 
    };

    // this.reset();
    
    // return {
    //     "draw"         : draw,
    //     "drawBlock"    : drawBlock,
    //     "drawPills"    : drawPills,
    //     "block"        : block,
    //     "setBlock"     : setBlock,
    //     "reset"        : reset,
    //     "isWallSpace"  : isWall,
    //     "isFloorSpace" : isFloorSpace,
    //     "height"       : height,
    //     "width"        : width,
    //     "blockSize"    : blockSize
    // };
}

class PACMAN extends React.Component {

    status : number;
    ghosts: GhostClass[];
    ghostSpecs;
    eatenCount   = 0;
    level        = 0;
    tick         = 0;
    ghostPos: any[];
    userPos: any; 
    statusChanged = true;
    timerStart: number;
    lastTime     = 0;
    ctx: CanvasRenderingContext2D | null = null;
    timer        = 0;
    // map: Map;
    user: User;
    stored: number;
    componentDidMount() {
        var canvas_container = document.getElementById("canvas_container");
        var root = document.getElementById("root");
        if(!canvas_container){
            canvas_container = document.createElement("Box");
            canvas_container.id = "canvas_container";
            root?.appendChild(canvas_container);
        } 
        console.log("--PACMAN: Class constructor");

        // var canvas = document.createElement("canvas");
        var canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if(!canvas) 
        {
            canvas = document.createElement("canvas");
            canvas.id="canvas";
            canvas.setAttribute("width", (15 * PACMAN_MAP[0].length * 1.1) + 10 + "px");
            canvas.setAttribute("height", (15 * PACMAN_MAP.length *1.1) + 10 + "px");
            canvas_container.appendChild(canvas);
            console.log("--PACMAN: canvas exists");
        }

        this.ctx = canvas.getContext("2d");
        if(this.ctx){
            // var tMap   = new Map(15);
            // this.user  = new User(this, tMap);
            var nLen = this.ghostSpecs.length;
            for (var i = 0;  i < nLen; i += 1) {
                var ghost = new GhostClass({"getTick":this.getTick}, this.user.map, this.ghostSpecs[i]);
                this.ghosts.push(ghost);
            }
            this.user.reset();
            // this.user.map.draw(this.ctx);
            // this.dialog("Loading ...");
        }
        // this.dialog("Press N to Start");
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("mousedown",this.mouseDown);
        
        this.timer = window.setInterval(this.mainLoop, 1000 / PACMAN_FPS);
        // this.state.isMintable = false;
    }

    keyDown = (event: any) =>{
        if (event.isComposing || event.keyCode === 229) {
            return;
          }
          // do something
          if(this.status === COMPLETED) return false;
          if(!this.ctx) return false;
          if (event.keyCode === KEY.N) {
              this.startNewGame();
          } else if (event.keyCode === KEY.S) {
              // audio.disableSound();
              // localStorage["soundDisabled"] = !this.soundDisabled();
          } else if (event.keyCode === KEY.P && this.status === PAUSE) {
              // audio.resume();
              this.user.map.draw(this.ctx);
              this.setStatus(this.stored);
          } else if (event.keyCode === KEY.P) {
              this.stored = this.status;
              this.setStatus(PAUSE);
              // audio.pause();
              this.user.map.draw(this.ctx);
              this.dialog("Paused");
          } else if (this.status !== PAUSE) {   
              return this.user.keyDown(event);
          }
          return true;

    }
    mouseDown = (event: any) => {
        // do something
        if(this.status === COMPLETED) return false;
        // console.log(this.status === COMPLETED);
        if(!this.ctx) return false;
        if(this.status === WAITING)
        {
            this.startNewGame();
        }
        else{
            return this.user.mouseDown(event);
        }
        return true;
        
    }
    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        window.clearInterval(this.timer);
        window.removeEventListener("keydown",this.keyDown);
        window.removeEventListener("mousedown",this.mouseDown);
    }
    constructor(props:any){
        super(props);
        this.ghosts = new Array();
        this.ghostPos = new Array();
        this.timerStart = 0;
        this.ghostSpecs = ["#00FFDE", "#FF0000", "#FFB8DE", "#FFB847"];
        this.user = new User({ 
            "completedLevel" : this.completedLevel, 
            "eatenPill"      : this.eatenPill 
        });
        this.stored = 0;
        this.status = WAITING;

    }
    
    getTick =()=> { 
        return this.tick;
        // return 0;
    };

    drawScore = (text: number, position: { [x: string]: { [x: string]: number; }; }) =>{
        if(this.ctx){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font      = "12px BDCartoonShoutRegular";
            this.ctx.fillText(text.toString(), 
                         (position["new"]["x"] / 10) * this.user.map.blockSize, 
                         ((position["new"]["y"] + 5) / 10) * this.user.map.blockSize);
        }
    }
    
    dialog = (text: string) => {
        if(!this.ctx) return;

        if(this.ctx){
            this.ctx.fillStyle = "#FFFF00";
            this.ctx.font      = "18px Calibri";
            }
        var width = this.ctx.measureText(text).width,
            x     = ((19 * this.user.map.blockSize) - width) / 2;        
            // console.log(this.map.width);
            // console.log(this.map.blockSize);
            this.ctx.fillText(text, x, (22 * 10) + 8);
    }

    soundDisabled = () => {
        return localStorage["soundDisabled"] === "true";
    };
    
    startLevel = ()=> {        
        console.log("--bb--" + this.ghosts.length);
        this.user.resetPosition();
        for (var i = 0; i < this.ghosts.length; i += 1) { 
            this.ghosts[i].reset();
        }
        // audio.play("start");
        this.timerStart = this.tick;
        this.setStatus(COUNTDOWN);
    }    

    startNewGame = () => {

        console.log("start the new game");
        if(!this.ctx) return;
        this.setStatus(WAITING);
        this.level = 1;
        // this.map.reset();
        this.user.reset();
        this.user.map.draw(this.ctx);
        this.startLevel();
    }

    // keyDown = (e: React.KeyboardEvent<Element>) => {
    //     if(!this.ctx) return false;
    //     if (e.keyCode === KEY.N) {
    //         this.startNewGame();
    //     } else if (e.keyCode === KEY.S) {
    //         // audio.disableSound();
    //         localStorage["soundDisabled"] = !this.soundDisabled();
    //     } else if (e.keyCode === KEY.P && this.status === PAUSE) {
    //         // audio.resume();
    //         this.map.draw(this.ctx);
    //         this.setStatus(this.stored);
    //     } else if (e.keyCode === KEY.P) {
    //         this.stored = this.status;
    //         this.setStatus(PAUSE);
    //         // audio.pause();
    //         this.map.draw(this.ctx);
    //         this.dialog("Paused");
    //     } else if (this.status !== PAUSE) {   
    //         return this.user.keyDown(e);
    //     }
    //     return true;
    // }    

    loseLife = () => {        
        this.setStatus(WAITING);
        this.user.loseLife();
        if (this.user.getLives() > 0) {
            this.startLevel();
        }
    }

    setStatus = (nState: number) => { 
        this.status = nState;
        this.statusChanged = true;
    };
    
    collided = (user: { x: number; y: number; }, ghost: { x: number; y: number; }) => {
        return (Math.sqrt(Math.pow(ghost.x - user.x, 2) + 
                          Math.pow(ghost.y - user.y, 2))) < 10;
    };

    // drawFooter = () => {
        
    //     var topLeft  = (this.user.map.height * this.user.map.blockSize),
    //         textBase = topLeft + 17;
    //         if(!this.ctx) return;
        
    //         this.ctx.fillStyle = "#000000";
    //         this.ctx.fillRect(0, topLeft, (this.user.map.width * this.user.map.blockSize), 30);
        
    //         this.ctx.fillStyle = "#FFFF00";

    //     for (var i = 0, len = this.user.getLives(); i < len; i++) {
    //         this.ctx.fillStyle = "#FFFF00";
    //         this.ctx.beginPath();
    //         this.ctx.moveTo(150 + (25 * i) + this.user.map.blockSize / 2,
    //                    (topLeft+1) + this.user.map.blockSize / 2);
            
    //         this.ctx.arc(150 + (25 * i) + this.user.map.blockSize / 2,
    //                 (topLeft+1) + this.user.map.blockSize / 2,
    //                 this.user.map.blockSize / 2, Math.PI * 0.25, Math.PI * 1.75, false);
    //         this.ctx.fill();
    //     }

    //     this.ctx.fillStyle = !this.soundDisabled() ? "#00FF00" : "#FF0000";
    //     this.ctx.font = "bold 16px sans-serif";
    //     //ctx.fillText("♪", 10, textBase);
    //     this.ctx.fillText("s", 10, textBase);

    //     this.ctx.fillStyle = "#FFFF00";
    //     this.ctx.font      = "14px Calibri";
    //     this.ctx.fillText("Score: " + this.user.theScore(), 30, textBase);
    //     this.ctx.fillText("Level: " + this.level, 260, textBase);
    // }

    redrawBlock = (pos: { y: number; x: number; }) => {
        if(!this.ctx) return;
        this.user.map.drawBlock(Math.floor(pos.y/10), Math.floor(pos.x/10), this.ctx);
        this.user.map.drawBlock(Math.ceil(pos.y/10), Math.ceil(pos.x/10), this.ctx);
    }

    mainDraw = () => { 
        if(!this.ctx) return;

        var diff, u, i, len, nScore;
        
        this.ghostPos = [];
        // console.log(this.ghosts.length);
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            this.ghostPos.push(this.ghosts[i].move(this.ctx));
        }
        u = this.user.move(this.ctx);
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            this.redrawBlock(this.ghostPos[i].old);
        }
        this.redrawBlock(u.old);
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            this.ghosts[i].draw(this.ctx);
            // console.log("This is main draw");
        }                     
        this.user.draw(this.ctx);
        
        this.userPos = u["new"];
        
        for (i = 0, len = this.ghosts.length; i < len; i += 1) {
            if (this.collided(this.userPos, this.ghostPos[i]["new"])) {
                if (this.ghosts[i].isVunerable()) { 
                    // this.audio.play("eatghost");
                    this.ghosts[i].eat();
                    this.eatenCount += 1;
                    nScore = this.eatenCount * 50;
                    this.drawScore(nScore, this.ghostPos[i]);
                    this.user.addScore(nScore);                    
                    this.setStatus(EATEN_PAUSE);
                    this.timerStart = this.tick;
                } else if (this.ghosts[i].isDangerous()) {
                    // this.audio.play("die");
                    this.setStatus(DYING);
                    this.timerStart = this.tick;
                }
            }
        }                             
    };

    mainLoop = () => {

        var diff;
        if(!this.ctx) return;

        if (this.status !== PAUSE) { 
            ++this.tick;
        }

        this.user.map.drawPills(this.ctx);

        if (this.status === PLAYING) {
            this.mainDraw();
        } else if (this.status === WAITING && this.statusChanged) {            
            this.statusChanged = false;
            this.user.map.draw(this.ctx);
            this.dialog("Press N to start a New game");            
        } else if (this.status === EATEN_PAUSE && 
                   (this.tick - this.timerStart) > (PACMAN_FPS / 3)) {
                    this.user.map.draw(this.ctx);
                    this.setStatus(PLAYING);
        } else if (this.status === DYING) {
            if (this.tick - this.timerStart > (PACMAN_FPS * 2)) { 
                this.loseLife();
            } else { 
                this.redrawBlock(this.userPos);
                for (var i = 0, len = this.ghosts.length; i < len; i += 1) {
                    this.redrawBlock(this.ghostPos[i].old);
                    this.ghostPos.push(this.ghosts[i].draw(this.ctx));
                }                                   
                this.user.drawDead(this.ctx, (this.tick - this.timerStart) / (PACMAN_FPS * 2));
            }
        } else if (this.status === COUNTDOWN) {
            
            diff = 5 + Math.floor((this.timerStart - this.tick) / PACMAN_FPS);
            
            if (diff === 0) {
                this.user.map.draw(this.ctx);
                this.setStatus(PLAYING);
            } else {
                if (diff !== this.lastTime) { 
                    this.lastTime = diff;
                    this.user.map.draw(this.ctx);
                    this.dialog("Starting in: " + diff);
                }
            }
        } else if(this.status === COMPLETED){

            document.removeEventListener("keydown",this.keyDown);
            document.removeEventListener("mousedown",this.mouseDown);
            
            this.dialog("You completed the mission!");
            this.timer = 0;
        }

        // this.drawFooter();
    }

    eatenPill = () => {
        // audio.play("eatpill");
        this.timerStart = this.tick;
        this.eatenCount = 0;
        for (var i = 0; i < this.ghosts.length; i += 1) {
            // this.ghosts[i].makeEatable(this.ctx);
            this.ghosts[i].makeEatable();
        }        
    };
    
    completedLevel = () => {
        this.setStatus(COMPLETED);
        this.setState({mintInfo:{link:"http://www.mintlink.com",text:"Mint Here",visibility:"visible"}});
        window.clearInterval(this.timer);
        window.removeEventListener("keydown",this.keyDown);
        window.removeEventListener("mousedown",this.mouseDown);
        this.dialog("Congratulations Sapien!");
    };

    keyPress = (e : KeyboardEvent) => { 
        if (this.status !== WAITING && this.status !== PAUSE) { 
            e.preventDefault();
            e.stopPropagation();
        }
    };
    

        
    // loaded = () => {

    //     this.dialog("Press N to Start");
        
    //     // document.addEventListener("keydown", this.keydown, true);
    //     // document.addEventListener("keypress", this.keyPress, true); 
        
    //     this.timer = window.setInterval(this.mainLoop, 1000 / PACMAN_FPS);
    // };
    
    // // return {
    // //     "init" : init
    // // };
    // const [isMintable, setMintLink] = useState(false);
    state  = {
        mintInfo: {
            link:"",
            text:"",
            visibility:"hidden",
        }

    }
    
    render = () => {
        return(
            <Box>
                <Box id="canvas_container" sx={{pt:'30px'}}>
                    {/* <h1 color='white'>This is pacman game page</h1> */}
                    {/* <canvas id="canvas" /> */}
                    {/* { this.canvasContainer } */}
                </Box>
                <StyledMintButton variant='outlined' href={this.state.mintInfo.link} sx={{visibility:this.state.mintInfo.visibility}}>
                {this.state.mintInfo.text}
                </StyledMintButton>
            </Box>
        );
    }
};

// (function () {
// 	/* 0 - 9 */
// 	for (var i = 48; i <= 57; i++) {
//         var k_index = (i-48).toString(); 
//         KEY[k_index] = i;
// 	}
// 	/* A - Z */
// 	for (i = 65; i <= 90; i++) {
//         KEY['' + String.fromCharCode(i)] = i;
// 	}
// 	/* NUM_PAD_0 - NUM_PAD_9 */
// 	for (i = 96; i <= 105; i++) {
//         KEY['NUM_PAD_' + (i - 96)] = i;
// 	}
// 	/* F1 - F12 */
// 	for (i = 112; i <= 123; i++) {
//         KEY['F' + (i - 112 + 1)] = i;
// 	}
// })();


const PACMAN_MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	[0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
	[0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const PACMAN_WALLS = [
    
    [{"move": [0, 9.5]}, {"line": [3, 9.5]},
     {"curve": [3.5, 9.5, 3.5, 9]}, {"line": [3.5, 8]},
     {"curve": [3.5, 7.5, 3, 7.5]}, {"line": [1, 7.5]},
     {"curve": [0.5, 7.5, 0.5, 7]}, {"line": [0.5, 1]},
     {"curve": [0.5, 0.5, 1, 0.5]}, {"line": [9, 0.5]},
     {"curve": [9.5, 0.5, 9.5, 1]}, {"line": [9.5, 3.5]}],

    [{"move": [9.5, 1]},
     {"curve": [9.5, 0.5, 10, 0.5]}, {"line": [18, 0.5]},
     {"curve": [18.5, 0.5, 18.5, 1]}, {"line": [18.5, 7]},
     {"curve": [18.5, 7.5, 18, 7.5]}, {"line": [16, 7.5]},
     {"curve": [15.5, 7.5, 15.5, 8]}, {"line": [15.5, 9]},
     {"curve": [15.5, 9.5, 16, 9.5]}, {"line": [19, 9.5]}],

    [{"move": [2.5, 5.5]}, {"line": [3.5, 5.5]}],

    [{"move": [3, 2.5]},
     {"curve": [3.5, 2.5, 3.5, 3]},
     {"curve": [3.5, 3.5, 3, 3.5]},
     {"curve": [2.5, 3.5, 2.5, 3]},
     {"curve": [2.5, 2.5, 3, 2.5]}],

    [{"move": [15.5, 5.5]}, {"line": [16.5, 5.5]}],

    [{"move": [16, 2.5]}, {"curve": [16.5, 2.5, 16.5, 3]},
     {"curve": [16.5, 3.5, 16, 3.5]}, {"curve": [15.5, 3.5, 15.5, 3]},
     {"curve": [15.5, 2.5, 16, 2.5]}],

    [{"move": [6, 2.5]}, {"line": [7, 2.5]}, {"curve": [7.5, 2.5, 7.5, 3]},
     {"curve": [7.5, 3.5, 7, 3.5]}, {"line": [6, 3.5]},
     {"curve": [5.5, 3.5, 5.5, 3]}, {"curve": [5.5, 2.5, 6, 2.5]}],

    [{"move": [12, 2.5]}, {"line": [13, 2.5]}, {"curve": [13.5, 2.5, 13.5, 3]},
     {"curve": [13.5, 3.5, 13, 3.5]}, {"line": [12, 3.5]},
     {"curve": [11.5, 3.5, 11.5, 3]}, {"curve": [11.5, 2.5, 12, 2.5]}],

    [{"move": [7.5, 5.5]}, {"line": [9, 5.5]}, {"curve": [9.5, 5.5, 9.5, 6]},
     {"line": [9.5, 7.5]}],
    [{"move": [9.5, 6]}, {"curve": [9.5, 5.5, 10.5, 5.5]},
     {"line": [11.5, 5.5]}],


    [{"move": [5.5, 5.5]}, {"line": [5.5, 7]}, {"curve": [5.5, 7.5, 6, 7.5]},
     {"line": [7.5, 7.5]}],
    [{"move": [6, 7.5]}, {"curve": [5.5, 7.5, 5.5, 8]}, {"line": [5.5, 9.5]}],

    [{"move": [13.5, 5.5]}, {"line": [13.5, 7]},
     {"curve": [13.5, 7.5, 13, 7.5]}, {"line": [11.5, 7.5]}],
    [{"move": [13, 7.5]}, {"curve": [13.5, 7.5, 13.5, 8]},
     {"line": [13.5, 9.5]}],

    [{"move": [0, 11.5]}, {"line": [3, 11.5]}, {"curve": [3.5, 11.5, 3.5, 12]},
     {"line": [3.5, 13]}, {"curve": [3.5, 13.5, 3, 13.5]}, {"line": [1, 13.5]},
     {"curve": [0.5, 13.5, 0.5, 14]}, {"line": [0.5, 17]},
     {"curve": [0.5, 17.5, 1, 17.5]}, {"line": [1.5, 17.5]}],
    [{"move": [1, 17.5]}, {"curve": [0.5, 17.5, 0.5, 18]}, {"line": [0.5, 21]},
     {"curve": [0.5, 21.5, 1, 21.5]}, {"line": [18, 21.5]},
     {"curve": [18.5, 21.5, 18.5, 21]}, {"line": [18.5, 18]},
     {"curve": [18.5, 17.5, 18, 17.5]}, {"line": [17.5, 17.5]}],
    [{"move": [18, 17.5]}, {"curve": [18.5, 17.5, 18.5, 17]},
     {"line": [18.5, 14]}, {"curve": [18.5, 13.5, 18, 13.5]},
     {"line": [16, 13.5]}, {"curve": [15.5, 13.5, 15.5, 13]},
     {"line": [15.5, 12]}, {"curve": [15.5, 11.5, 16, 11.5]},
     {"line": [19, 11.5]}],

    [{"move": [5.5, 11.5]}, {"line": [5.5, 13.5]}],
    [{"move": [13.5, 11.5]}, {"line": [13.5, 13.5]}],

    [{"move": [2.5, 15.5]}, {"line": [3, 15.5]},
     {"curve": [3.5, 15.5, 3.5, 16]}, {"line": [3.5, 17.5]}],
    [{"move": [16.5, 15.5]}, {"line": [16, 15.5]},
     {"curve": [15.5, 15.5, 15.5, 16]}, {"line": [15.5, 17.5]}],

    [{"move": [5.5, 15.5]}, {"line": [7.5, 15.5]}],
    [{"move": [11.5, 15.5]}, {"line": [13.5, 15.5]}],
    
    [{"move": [2.5, 19.5]}, {"line": [5, 19.5]},
     {"curve": [5.5, 19.5, 5.5, 19]}, {"line": [5.5, 17.5]}],
    [{"move": [5.5, 19]}, {"curve": [5.5, 19.5, 6, 19.5]},
     {"line": [7.5, 19.5]}],

    [{"move": [11.5, 19.5]}, {"line": [13, 19.5]},
     {"curve": [13.5, 19.5, 13.5, 19]}, {"line": [13.5, 17.5]}],
    [{"move": [13.5, 19]}, {"curve": [13.5, 19.5, 14, 19.5]},
     {"line": [16.5, 19.5]}],

    [{"move": [7.5, 13.5]}, {"line": [9, 13.5]},
     {"curve": [9.5, 13.5, 9.5, 14]}, {"line": [9.5, 15.5]}],
    [{"move": [9.5, 14]}, {"curve": [9.5, 13.5, 10, 13.5]},
     {"line": [11.5, 13.5]}],

    [{"move": [7.5, 17.5]}, {"line": [9, 17.5]},
     {"curve": [9.5, 17.5, 9.5, 18]}, {"line": [9.5, 19.5]}],
    [{"move": [9.5, 18]}, {"curve": [9.5, 17.5, 10, 17.5]},
     {"line": [11.5, 17.5]}],

    [{"move": [8.5, 9.5]}, {"line": [8, 9.5]}, {"curve": [7.5, 9.5, 7.5, 10]},
     {"line": [7.5, 11]}, {"curve": [7.5, 11.5, 8, 11.5]},
     {"line": [11, 11.5]}, {"curve": [11.5, 11.5, 11.5, 11]},
     {"line": [11.5, 10]}, {"curve": [11.5, 9.5, 11, 9.5]},
     {"line": [10.5, 9.5]}]
];

// Object.prototype.clone = function () {
//     var i, newObj = (this instanceof Array) ? [] : {};
//     for (i in this) {
//         if (i === 'clone') {
//             continue;
//         }
//         if (this[i] && typeof this[i] === "object") {
//             newObj[i] = this[i].clone();
//         } else {
//             newObj[i] = this[i];
//         }
//     }
//     return newObj;
// };

// $(function(){
//   var el = document.getElementById("pacman");

//   if (Modernizr.canvas && Modernizr.localstorage && 
//       Modernizr.audio && (Modernizr.audio.ogg || Modernizr.audio.mp3)) {
//     window.setTimeout(function () { PACMAN.init(el, "https://raw.githubusercontent.com/daleharvey/pacman/master/"); }, 0);
//   } else { 
//     el.innerHTML = "Sorry, needs a decent browser<br /><small>" + 
//       "(firefox 3.6+, Chrome 4+, Opera 10+ and Safari 4+)</small>";
//   }
// });


export const PacmanPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box id="whole_container">
                <PACMAN />
            </Box>
        </>
    );
};

