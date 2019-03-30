var app = new Vue({
    el: '#board',
    data: {
	name: "",
	subject: "",
	comment: "",
	threads: [],
	
    },
    
    methods: {
	async newThread(){
	    try {
		let r2 = await axios.post('/api/threads', {
		    name: this.name,
		    subject: this.subject,
		    comment: this.comment,
		});
	    } catch (error) {
		console.log(error);
	    }
	}
    }
});
