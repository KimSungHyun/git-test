/**
 * Vworld 영상지도
 */  

/**
 * @requires OpenLayers/Layer/Grid.js
 * @requires OpenLayers/Layer/XYZ.js
 */

 /** Inherits from:
 *  - <OpenLayers.Layer.XYZ>
 */

OpenLayers.Layer.Vworld_Sat = OpenLayers.Class(OpenLayers.Layer.XYZ, {
	initialize: function(name, options) {
		var url = 'http://61.97.240.70:8080/2d/Satellite/201301/${z}/${x}/${y}.jpeg';
		
		if(options == null){	options = new Object();	}
		
		options.numZoomLevels = options.numZoomLevels == null ? 6 : options.numZoomLevels;
		options.transitionEffect = options.transitionEffect == null ? 'resize': options.transitionEffect;
		
		options.maxExtent = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
		options.tileOrigin = new OpenLayers.LonLat(-20037508.34, -20037508.34);
		options.isBaseLayer = true;
		options.visibility = true;
//		options.attribution = '<img src="http://map.vworld.kr/images/maps/logo_openplatform.png"/>';
		options.attribution = '<div>배경지도는 공간정보 오픈플랫폼 브이월드 지도입니다.</div>';
		options.maxResolution = 2445.9849047851562 / 2;

//		options.serverResolutions = [
// 		                    	    	2445.9849047851562, 1222.9924523925781, 611.4962261962891,
//  		                      	        305.74811309814453, 152.87405654907226, 76.43702827453613,
//  		                      	        38.218514137268066, 19.109257068634033, 9.554628534317017,
//  		                      	        4.777314267158508, 2.388657133579254, 1.194328566789627,
//  		                      	        0.5971642833948135
//		                      	     ];

		options.serverResolutions = [
		                    	    	2445.9849047851562, 1222.9924523925781, 611.4962261962891,
		                      	        305.74811309814453, 152.87405654907226, 76.43702827453613,
		                      	        38.218514137268066, 19.109257068634033, 9.554628534317017,
										4.777314267158508, 2.388657133579254, 1.194328566789627,
		                      	     ];		
		if (options && options.sphericalMercator || this.sphericalMercator) {
            options = OpenLayers.Util.extend({
                projection: "EPSG:900913",
//                numZoomLevels: 19
                numZoomLevels: 9 
            }, options);
        }
        
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [
            name || this.name, url || this.url, {}, options
        ]);
    },

	getXYZ: function(bounds) {
	    var res = this.getServerResolution();
	    var x = Math.round((bounds.left - this.maxExtent.left) /
	        (res * this.tileSize.w));
	    var y = Math.round((this.maxExtent.top - bounds.top) /
	        (res * this.tileSize.h));
	    var z = this.getServerZoom();
	
	    if (this.wrapDateLine) {
	        var limit = Math.pow(2, z);
	        x = ((x % limit) + limit) % limit;
	    }
	
	    return {'x': x, 'y': y, 'z': z+6};
	}


});

OpenLayers.Layer.Vworld_Hybrid = OpenLayers.Class(OpenLayers.Layer.XYZ, {
	initialize: function(name, options) {
		var url = 'http://61.97.240.70:8080/2d/Hybrid/201310/${z}/${x}/${y}.png';
		
		if(options == null){	options = new Object();	}
		
		options.numZoomLevels = options.numZoomLevels == null ? 13 : options.numZoomLevels;
		options.transitionEffect = options.transitionEffect == null ? 'resize': options.transitionEffect;
		options.visibility = options.visibility == null ? false : options.visibility;
		options.isBaseLayer = options.isBaseLayer == null ? false : options.isBaseLayer;
		
		options.maxExtent = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
		options.tileOrigin = new OpenLayers.LonLat(-20037508.34, -20037508.34);
		
//		options.attribution = '<img src="http://map.vworld.kr/images/maps/logo_openplatform.png"/>';
		options.attribution = '<div>배경지도는 공간정보 오픈플랫폼 브이월드 지도입니다.</div>';
		options.maxResolution = 2445.9849047851562;
		options.serverResolutions = [
 		                    	    	2445.9849047851562, 1222.9924523925781, 611.4962261962891,
  		                      	        305.74811309814453, 152.87405654907226, 76.43702827453613,
  		                      	        38.218514137268066, 19.109257068634033, 9.554628534317017,
  		                      	        4.777314267158508, 2.388657133579254, 1.194328566789627,
  		                      	        0.5971642833948135
		                      	     ];
		
		
		if (options && options.sphericalMercator || this.sphericalMercator) {
            options = OpenLayers.Util.extend({
                projection: "EPSG:900913",
                numZoomLevels: 19 
            }, options);
        }
        
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [
            name || this.name, url || this.url, {}, options
        ]);
    }

	,getXYZ: function(bounds) {
	    var res = this.getServerResolution();
	    var x = Math.round((bounds.left - this.maxExtent.left) /
	        (res * this.tileSize.w));
	    var y = Math.round((this.maxExtent.top - bounds.top) /
	        (res * this.tileSize.h));
	    var z = this.getServerZoom();
	
	    if (this.wrapDateLine) {
	        var limit = Math.pow(2, z);
	        x = ((x % limit) + limit) % limit;
	    }
	
	    return {'x': x, 'y': y, 'z': z+6};
	}
});


/**
 * Vworld 일반지도
 */  

/**
 * @requires OpenLayers/Layer/Grid.js
 * @requires OpenLayers/Layer/XYZ.js
 */

 /** Inherits from:
 *  - <OpenLayers.Layer.XYZ>
 */

OpenLayers.Layer.Vworld_Base = OpenLayers.Class(OpenLayers.Layer.XYZ, {
	initialize: function(name, options) {
		var url = 'http://61.97.240.70:8080/2d/Base/201301/${z}/${x}/${y}.png';
		
		if(options == null){	options = new Object();	}
		
		options.numZoomLevels = options.numZoomLevels == null ? 12 : options.numZoomLevels;
		options.transitionEffect = options.transitionEffect == null ? 'resize': options.transitionEffect;
		
		options.maxExtent = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
		options.tileOrigin = new OpenLayers.LonLat(-20037508.34, -20037508.34);
		options.isBaseLayer = true;
		options.visibility = true;
//		options.attribution = '<img src="http://map.vworld.kr/images/maps/logo_openplatform.png"/>';
		options.attribution = '<div>배경지도는 공간정보 오픈플랫폼 브이월드 지도입니다.</div>';
		options.maxResolution = 1222.9924523925781;
		options.serverResolutions = [
 		                    	    	1222.9924523925781, 611.4962261962891, 305.74811309814453, 
 		                    	    	152.87405654907226, 76.43702827453613, 38.218514137268066,
 		                    	    	19.109257068634033, 9.554628534317017, 4.777314267158508, 
 		                    	    	2.388657133579254, 1.194328566789627, 0.5971642833948135
		                      	     ];
		
		
		if (options && options.sphericalMercator || this.sphericalMercator) {
            options = OpenLayers.Util.extend({
                projection: "EPSG:900913",
                numZoomLevels: 19 
            }, options);
        }
        
        OpenLayers.Layer.Grid.prototype.initialize.apply(this, [
            name || this.name, url || this.url, {}, options
        ]);
    },

	getXYZ: function(bounds) {
	    var res = this.getServerResolution();
	    var x = Math.round((bounds.left - this.maxExtent.left) /
	        (res * this.tileSize.w));
	    var y = Math.round((this.maxExtent.top - bounds.top) /
	        (res * this.tileSize.h));
	    var z = this.getServerZoom();
	
	    if (this.wrapDateLine) {
	        var limit = Math.pow(2, z);
	        x = ((x % limit) + limit) % limit;
	    }
	
	    return {'x': x, 'y': y, 'z': z+7};
	}
});


