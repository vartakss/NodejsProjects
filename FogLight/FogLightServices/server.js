function Link(href, method, rel){

	this.href = href;
	this.method = method;
	this.rel = rel;
}

function Subscriber(subscriberId, subscriberName){

	this.subscriberId = subscriberId;
	this.subscriberName = subscriberName;
	this.links = [];
}

function NewsSource(sourceId, sourceName, url){

	this.sourceId = sourceId;
	this.sourceName = sourceName;
	this.url = url;
	this.links = [];
}

//Data fetching methods -- start

function fetchSubscriberLinks(subscriberId){

	var links = [];
	links.push(new Link('/subscribers/' + subscriberId, 'GET', 'self'));
	links.push(new Link('/subscribers/' + subscriberId, 'PUT', 'update'));
	links.push(new Link('/subscribers/' + subscriberId, 'DELETE', 'delete'));
	links.push(new Link('/subscribers/' + subscriberId + '/newssources', 'GET', 'newssources'));

	return links;

}

function fetchNewsSourceLinks(subscriberId, sourceId){

	var links = [];
	links.push(new Link('/subscribers/' + subscriberId + '/newssources/' + sourceId, 'GET', 'self'));
	links.push(new Link('/subscribers/' + subscriberId + '/newssources/' + sourceId, 'PUT', 'update'));
	links.push(new Link('/subscribers/' + subscriberId + '/newssources/' + sourceId, 'DELETE', 'delete'));
	
	return links;

}

function fetchAllSubscribers(req, res, next){

	var subscriber1 = new Subscriber(1, "Saurabh");
	subscriber1.links = fetchSubscriberLinks(1);

	var subscriber2 = new Subscriber(2, "Vidhya");
	subscriber2.links = fetchSubscriberLinks(2);

	var subscriber3 = new Subscriber(3, "Amol");
	subscriber3.links = fetchSubscriberLinks(3);

	var subscribers = [];
	subscribers.push(subscriber1);
	subscribers.push(subscriber2);
	subscribers.push(subscriber3);
	res.setHeader('content-type', 'application/json')
	res.send(subscribers);
	
}

function fetchSubscriber(req, res, next){

	var subscriberId = req.params.subscriberId;
	var subscriber;
	
	
	if(subscriberId == 1){
		subscriber = new Subscriber(1, "Saurabh");
		subscriber.links = fetchSubscriberLinks(1);

	}

	if(subscriberId == 2){
		subscriber = new Subscriber(2, "Vidhya");
		subscriber.links = fetchSubscriberLinks(2);

	}

	if(subscriberId == 3){
		subscriber = new Subscriber(3, "Amol");
		subscriber.links = fetchSubscriberLinks(3);

	}
	
	res.setHeader('content-type', 'application/json')
	res.send(subscriber);
	
}

function fetchNewsSources(req, res, next){

	var subscriberId = req.params.subscriberId;
	var newsSources = [];
	
	
	if(subscriberId == 1){
		var newsSource1 = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
		newsSource1.links = fetchNewsSourceLinks(1, 1);

		var newsSource2 = new NewsSource(2, 'CNN', 'http://rss.cnn.com/rss/cnn_topstories.rss');
		newsSource2.links = fetchNewsSourceLinks(1, 2);

		var newsSource3 = new NewsSource(3, 'TOI', 'http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
		newsSource3.links = fetchNewsSourceLinks(1, 3);

		newsSources.push(newsSource1);
		newsSources.push(newsSource2);
		newsSources.push(newsSource3);

	}

	if(subscriberId == 2){
		var newsSource1 = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
		newsSource1.links = fetchNewsSourceLinks(2, 1);

		var newsSource2 = new NewsSource(2, 'CNN', 'http://rss.cnn.com/rss/cnn_topstories.rss');
		newsSource2.links = fetchNewsSourceLinks(2, 2);

		newsSources.push(newsSource1);
		newsSources.push(newsSource2);
		

	}

	if(subscriberId == 3){
		var newsSource1 = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
		newsSource1.links = fetchNewsSourceLinks(3, 1);

		var newsSource3 = new NewsSource(3, 'TOI', 'http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
		newsSource3.links = fetchNewsSourceLinks(3, 3);

		newsSources.push(newsSource1);
		newsSources.push(newsSource3);

	}
	
	res.setHeader('content-type', 'application/json')
	res.send(newsSources);
	
}

function fetchNewsSource(req, res, next){

	var subscriberId = req.params.subscriberId;
	var sourceId = req.params.sourceId;
	var newsSource;
	
	
	if(subscriberId == 1){
		
		if(sourceId == 1){
			newsSource = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
			newsSource.links = fetchNewsSourceLinks(1, 1);
		}

		if(sourceId == 2){
			newsSource = new NewsSource(2, 'CNN', 'http://rss.cnn.com/rss/cnn_topstories.rss');
			newsSource.links = fetchNewsSourceLinks(1, 2);
		}

		if(sourceId == 3){
			newsSource = new NewsSource(3, 'TOI', 'http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
			newsSource.links = fetchNewsSourceLinks(1, 3);
		}
		
	}

	if(subscriberId == 2){
		if(sourceId == 1){
			newsSource = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
			newsSource.links = fetchNewsSourceLinks(2, 1);
		}

		if(sourceId == 2){
			newsSource = new NewsSource(2, 'CNN', 'http://rss.cnn.com/rss/cnn_topstories.rss');
			newsSource.links = fetchNewsSourceLinks(2, 2);
		}

			

	}

	if(subscriberId == 3){
		if(sourceId == 1){
			newsSource = new NewsSource(1, 'BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
			newsSource.links = fetchNewsSourceLinks(3, 1);
		}

		if(sourceId == 3){
			newsSource = new NewsSource(3, 'TOI', 'http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms');
			newsSource.links = fetchNewsSourceLinks(3, 3);
		}

	}
	
	res.setHeader('content-type', 'application/json')
	res.send(newsSource);
	
}

function createSubscriber(req, res, next){
	console.log(req.body.subscriberName);

}

//Data fetching methods -- end

var restify = require('restify');
var server = restify.createServer();

server.use(restify.bodyParser());

server.get('/subscribers', fetchAllSubscribers);
server.get('/subscribers/:subscriberId', fetchSubscriber);
server.get('/subscribers/:subscriberId/newssources', fetchNewsSources);
server.get('/subscribers/:subscriberId/newssources/:sourceId', fetchNewsSource);

server.post('/subscribers', createSubscriber);

server.listen(8080, function(){

	console.log('%s is listening at %s', server.name, server.url);
});