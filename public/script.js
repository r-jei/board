var app = new Vue({
    el: '#board',
    data: {
	name: "",
	subject: "",
	comment: "",
	threads: [],
	edit: "",
	findThread: null,
    },
    
    created(){
	this.getThreads();
    },
    
    methods: {
	async newThread(){
	    try {
		if(this.name===''){
		    this.name = 'Anonymous';
		}
		let r2 = await axios.post('/api/threads', {
		    name: this.name,
		    subject: this.subject,
		    comment: this.comment
		});
	    } catch (error) {
		console.log(error);
	    }
	},

	async getThreads() {
	    console.log('sup');
	    try {
		let response = await axios.get("/api/threads");
		this.threads = response.data;
		console.log(this.threads)
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},

	async deleteThread(thread) {
	    try {
		let response = axios.delete("/api/threads/" + thread._id);
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},

	async editThread(thread) {
	    try {
		thread.edit=true
		thread.temp = thread.name
		app.$forceUpdate()
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},

	async saveEdit(thread) {
	    try {
		thread.edit=true
		app.$forceUpdate()
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},
	
	async cancelEdit(thread) {
	    try {
		thread.edit=false
		app.$forceUpdate()
		return true;
	    } catch (error) {
		console.log(error);
	    }
	},
	
    }
});
