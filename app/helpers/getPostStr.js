module.exports = function(postType, requestType) {    
	let postStr;
    switch (postType.toLowerCase()) {
	    case 'features':
	    	if (requestType == 'share')
	    		postStr = 'features';
	    	else if (requestType == 'api')
	    		postStr = 'featured_posts';
	    	else
	    		postStr = 'Features';
	      	break;
	    case 'trend':
	      	if (requestType == 'share')
	    		postStr = 'trend';
	    	else if (requestType == 'api')
	    		postStr = 'trend_posts';
	    	else
	    		postStr = 'Trend';
	      	break;
	    case 'oncourt':
	    case 'on_court':
	      	if (requestType == 'share')
	    		postStr = 'oncourt';
	    	else if (requestType == 'api')
	    		postStr = 'oncourt_posts';
	    	else
	    		postStr = 'On Court';
	      	break;
	    case 'streetsnap':
	    case 'street_snap':
	      	if (requestType == 'share')
	    		postStr = 'streetsnap';
	    	else if (requestType == 'api')
	    		postStr = 'streetsnap_posts';
	    	else
	    		postStr = 'Street Snap';
	      	break;
	    default:
	      	if (requestType == 'share')
	    		postStr = 'rumors';
	    	else if (requestType == 'api')
	    		postStr = 'rumor_posts';
	    	else
	    		postStr = 'Rumors';
	      	break;
	}
	return postStr;
}