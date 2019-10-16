sap.ui.define(["sap/ui/core/util/MockServer"],function(e){"use strict";var t,a="Ztestchart2.Ztestchart2/",r=a+"localService/mockdata";return{init:function(){var n=jQuery.sap.getUriParameters(),s=jQuery.sap.getModulePath(r),i=jQuery.sap.getModulePath(a+"manifest",".json"),o="ThirdChartSet",u=n.get("errorType"),c=u==="badRequest"?400:500,p=jQuery.sap.syncGetJSON(i).data,l=p["sap.app"].dataSources,d=l.mainService,f=jQuery.sap.getModulePath(a+d.settings.localUri.replace(".xml",""),".xml"),g=/.*\/$/.test(d.uri)?d.uri:d.uri+"/",h=d.settings.annotations;t=new e({rootUri:g});e.config({autoRespond:true,autoRespondAfter:n.get("serverDelay")||1e3});t.simulate(f,{sMockdataBaseUrl:s,bGenerateMissingMockData:true});var m=t.getRequests(),y=function(e,t,a){a.response=function(a){a.respond(e,{"Content-Type":"text/plain;charset=utf-8"},t)}};if(n.get("metadataError")){m.forEach(function(e){if(e.path.toString().indexOf("$metadata")>-1){y(500,"metadata Error",e)}})}if(u){m.forEach(function(e){if(e.path.toString().indexOf(o)>-1){y(c,u,e)}})}t.start();jQuery.sap.log.info("Running the app with mock data");h.forEach(function(t){var r=l[t],n=r.uri,s=jQuery.sap.getModulePath(a+r.settings.localUri.replace(".xml",""),".xml");new e({rootUri:n,requests:[{method:"GET",path:new RegExp(""),response:function(e){var t=jQuery.sap.sjax({url:s,dataType:"xml"}).data;e.respondXML(200,{},jQuery.sap.serializeXML(t));return true}}]}).start()})},getMockServer:function(){return t}}});