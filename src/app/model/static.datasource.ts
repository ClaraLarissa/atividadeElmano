import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, from } from "rxjs";

@Injectable()
export class StaticDataSource {
private products: Product[] = [
new Product(1, "Tênis Esportivo", "Category 1 - Sapatos", "Product 1 (Category 1)", 100, "data:image/jpeg;base64,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"),
new Product(2, "Chuteira de Futebol", "Category 1 - Sapatos", "Product 2 (Category 1)", 100, "https://static.prospin.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/p/cp8957-chuteira-adidas-futebol-campo-copa-18-3-unis-preta-e-vermelha.jpg"),
new Product(3, "Tenis de Golfe", "Category 1 - Sapatos", "Product 3 (Category 1)", 100, "https://http2.mlstatic.com/sapato-tenis-golfe-adidas-tour-360-mod-2018-38-85-usa-D_NQ_NP_807762-MLB30771442919_052019-Q.jpg"),
new Product(4, "Sapatilha de Ballet", "Category 1 - Sapatos", "Product 4 (Category 1)", 100, "https://www.netdanca.com.br/image/cache/data/produtos/capezio/sapatilhas/13-1000x1000.JPG"),
new Product(5, "Tênis de Basquete", "Category 1 - Sapatos", "Product 5 (Category 1)", 100, "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhITEhEWFRUXFxUWGBYWGBkXFRYYFRUXFhUXFhUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGzIlHSEwLSsvNy0tLSsrLS0rKy0rMTc1LSstLi0uMC0tLS4tKy4uKy0tLSstLS8uKy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBQYIAQT/xABEEAABAwIDBAcFBAcGBwAAAAABAAIDBBESITEFBkFRBxMiYXGB8DJCkaGxUnLB0RQjU2KCkuEzQ3OistIWJUSjpLPx/8QAGQEBAQADAQAAAAAAAAAAAAAAAAECAwQF/8QAMBEBAQACAAIHBgUFAAAAAAAAAAECEQMSBCExQZGx4RMiMmGh0UJRUnFyBSQzgfD/2gAMAwEAAhEDEQA/AJxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARWauqZEx0kj2sYwFznONmtA1JJ0Ch/fbpqa0Oi2c27sx+kSNs0d8cZzce9wA7iglbbG26alaH1NRHC06Y3BuLuaDm4+CwkHSJs58rYmVBLnafq5Lc7XLVzNDVS1lWwzyPle9wxPdd7ra6E+yNbCwABW9dDtH120g9wuII3yk/vu/Vsv8AzuPi1ZSDoWmqGSNa+N7XscLtc0hzSOYIyIV1a9UQdQ91RDkDnNFezJf32jRs3I+/7Lvdc3O087Xta9hu1wBBHEFSwXERFAREQEREBERAREQEREBERAREQEREBERAREQF8e1tpxU0T5p5BHGwXLj8gBqSdABmVRtzbMNJC+eokDI2jMnUng1o95x4ALmTf3fWfaU2JxLIGk9VFfJvDEQPbkI1PDQd4fZ0kdIk20X9WwGOmaexF7zyNHy21PJug7zmtLZT39r4fmfy+SNy7vqf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"),
new Product(6, "Tapete de Yoga", "Category 2 - Acessorios", "Product 6 (Category 2)", 100, "https://imgcentauro-a.akamaihd.net/900x900/768981EZ/tapete-de-yoga-com-alca-oxer-mat-191-x-61-x-0-4-cm-img.jpg"),
new Product(7, "Calcanheira Oxer Gel Ponto", "Category 2 - Acessorios", "Product 7 (Category 2)", 100, "https://imgcentauro-a.akamaihd.net/900x900/77484704/calcanheira-oxer-gel-ponto-adulto-img.jpg"),
new Product(8, "Luvas de Academia", "Category 2 - Acessorios", "Product 8 (Category 2)", 100, "https://http2.mlstatic.com/D_NQ_NP_765866-MLB31118627483_062019-V.jpg"),
new Product(9, "Corda de Pular", "Category 2 - Acessorios", "Product 9 (Category 2)", 100, "https://lojamor.vteximg.com.br/arquivos/ids/163667-1000-1000/40300008-Corda-Pular-1.jpg?v=636437711494600000"),
new Product(10, "Bola de Pilates", "Category 2 - Acessorios", "Product 10 (Category 2)", 100, "https://decathlonpro.vteximg.com.br/arquivos/ids/1963440-500-500/gym-ball-120-m-no-size1.jpg?v=636632267926970000"),
new Product(11, "Medalha Ouro", "Category 3 - Premiações", "Product 11 (Category 3)", 100, "https://image.freepik.com/vetores-gratis/projeto-medalha-de-ouro_1166-34.jpg"),
new Product(12, "Medalha Bronze", "Category 3 - Premiações", "Product 12 (Category 3)", 100, "https://image.freepik.com/vetores-gratis/projeto-medalha-de-bronze_1166-32.jpg"),
new Product(13, "Medalha Prata", "Category 3 - Premiações", "Product 13 (Category 3)", 100, "https://media.istockphoto.com/photos/second-place-silver-medal-isolated-picture-id947477444"),
new Product(15, "Medalhas Diversas", "Category 3 - Premiações", "Product 15 (Category 3)", 100, "https://image.freepik.com/vetores-gratis/conjunto-de-medalha-medalhas-no-ouro-prata-e-bronze_33040-162.jpg"),
new Product(14, "Trofeu Esportivo", "Category 3 - Premiações", "Product 14 (Category 3)", 100, "https://cdn.iset.io/assets/54207/produtos/158/olimpico-b05-ac02-a.jpg"),
new Product(15, "Trofeu Olimpico", "Category 3 - Premiações", "Product 15 (Category 3)", 100, "https://cdn.iset.io/assets/54207/produtos/625/olimpico-c08-ac03-b.jpg"),
new Product(15, "Pódio", "Category 3 - Premiações", "Product 15 (Category 3)", 100, "https://s2.glbimg.com/_6oStEpr8ZLdipapM_f8FkdFTps=/0x0:650x400/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/x/d/tdbDKNTmafbbCczQ6TUA/48736-emcpy7.jpg")
];
getProducts(): Observable<Product[]> {
return from([this.products]);
}
}

