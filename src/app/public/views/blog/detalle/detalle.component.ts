import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { DateService } from 'src/app/core/utils/date.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{

  blogdId !: number;
  blogs: any;

  constructor(private route: ActivatedRoute,private blogService:BlogService,private fechaservice:DateService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.blogdId = params['blog_id'];
      if (this.blogdId) {
        this.obtenerDetalleBlog(this.blogdId);


      }
    });
  }

  obtenerDetalleBlog(blogId: number){
    const requestData = {
      request: {
        blog_id: blogId,
        user_id: null,
        status: true
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.blogService.listaBlogs(requestData).subscribe(

      response => {
        //        console.log('hist' + JSON.stringify(response));
        //    this.mostrarLoad=true
        console.log(response);
        this.blogs = response[0].data;

        this.blogs.forEach((blog:any) => {

            blog.urlImagen = this.blogService.getImageUrlBlog(blog.imagen);
            blog.created_at=this.fechaservice.formatDateToString(blog.created_at)


        });
        console.log(this.blogs)
        console.log(this.blogs[0].id)
      }

    );

  }

}
