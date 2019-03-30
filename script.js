var app = new Vue({
    el: '#board',
    data: {
	name: "",
	subject: "",
	comment: "",
	
    },
    
    methods: {
	async upload(){
	    try {
		const formData = new FormData();
		formData.append('photo', this.file, this.file.name)
		let r1 = await axios.post('/api/photos', formData);
		let r2 = await axios.post('/api/items', {
		    title: this.title,
		    path: r1.data.path,
		    desc: this.desc,
		});
		this.addItem = r2.data;
	    } catch (error) {
		console.log(error);
	    }
	}
    }
}
