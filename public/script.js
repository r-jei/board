var app = new Vue({
    el: '#board',
    data: {
	name: "",
	subject: "",
	comment: "",
	threads: [],
	
    },
    created(){
	this.getThreads();
    },
    methods: {
	async newThread(){
	    console.log('sup')
	    /*try {
		let r2 = await axios.post('/api/threads', {
		    name: this.name,
		    subject: this.subject,
		    comment: this.comment,
		});
	    } catch (error) {
		console.log(error);
	    }*/
	},

	async getThreads() {
	    console.log('sup');
	    try {
		let response = await axios.get("/api/threads");
		this.threads = response.data;
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},	
    }
});
