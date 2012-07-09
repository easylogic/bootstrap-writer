define([], function(){
    return Backbone.Model.extend({
        urlRoot: '/toies',
        idAttribute: "_id",
        defaults : {
            isRoot: false,
            title: '',
            span : 12,           // 기본 넓이 
            offset: "",
            text: '',           // raw 데이타
            viewText: '',       // 변환된 문자열
            children : []       // toies   
        }        
    })
})
