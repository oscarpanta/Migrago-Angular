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
  leidos:any;

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
        status: true,
        titulo:'',
        flag : null
      },
      order: {
        column: null,
        mode: null
      },
      page_size: 100,
      pgination_key: 1
    };

    this.blogService.listaGetBlog(requestData).subscribe(

      response => {
        //        console.log('hist' + JSON.stringify(response));
        //    this.mostrarLoad=true
        console.log(response);
        this.blogs = response[0].data;
        this.leidos=response[0].views

        console.log(this.leidos)
        console.log(this.leidos[0])

        this.blogs.forEach((blog:any) => {

            blog.urlImagen = this.blogService.getImageUrlBlog(blog.imagen);
            blog.created_at=this.fechaservice.formatDateToString(blog.created_at)


        });
        console.log(this.blogs)
        console.log(this.blogs[0].id)
      }

    );

  }
  shareOnFacebook() {
    // URL de tu blog que quieres compartir
    // const blogUrl = window.location.href;
    const blogUrl="https://migratego.com/temas"

    // Genera la URL de compartir de Facebook
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;

    // Abre una nueva ventana para compartir en Facebook
    window.open(facebookShareUrl, '_blank');
  }

}
