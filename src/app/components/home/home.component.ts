import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { CommonModule } from '@angular/common';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import 'zone.js/dist/zone';  // Included with Angular CLI.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(SlickCarouselComponent) slickCarousel: SlickCarouselComponent | any;
  products: Array<any> = [];
  categories: any = []; // Dữ liệu động từ categoryService
  selectedCategoryId: number = 0; // Giá trị category được chọn
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = "";
  // test:any[]=['a','b'];

  test = [
    { id: 1, name: 'Superman' },
    { id: 2, name: 'Batman' },
    { id: 5, name: 'BatGirl' },
    { id: 3, name: 'Robin' },
    { id: 4, name: 'Flash' }
  ];

  productss = [
    {
      name: 'Viên uống hỗ trợ tăng chiều cao GH Gold Nhật Bản 120 viên',
      price: 680000,
      originalPrice: 800000,
      imageUrl: './../../../assets/images/combo-2-hop-vien-uong-ho-tro-tang-chieu-cao-gh-gold-nhat-ban-120-vien-000.webp',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Combo 3 hộp Viên uống tăng chiều cao GH Creation EX+ Nhật Bản 270 viên',
      price: 1890000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/combo-3-hop-vien-uong-tang-chieu-cao-gh-creation-ex-270-vien-nhat-ban-992.webp',
      discount: 15,
      rating: 5,
      reviews: 11244
    },
    {
      name: 'Combo 3 hộp nước uống Collagen trắng da, giảm nám Nucos Super White (Hộp 10 chai x 50ml)',
      price: 2680000,
      originalPrice: 2800000,
      imageUrl: './../../../assets/images/combo-3-hop-nuoc-uong-the-collagen-shiseido-hop-10-chai-x-50ml.webp',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Combo 3 hộp nước uống The Collagen Shiseido (Hộp 10 chai x 50ml) (Chính hãng)',
      price: 1890000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/giam-nam-nucos-super-white-hop-10-chai-x-50ml.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Viên uống bổ xương khớp Glucosamine Orihiro 900 viên (Chính hãng)',
      price: 680000,
      originalPrice: 800000,
      imageUrl: './../../../assets/images/vien-uong-tri-khop-glucosamin-900-vien.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Nước uống làm trắng da Shiseido Pure White (Hộp 10 chai x 50ml)',
      price: 1890000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/nuoc-uong-trangda.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Combo 3 hộp nước uống Superior Collagen 10000mg Nhật Bản (Hộp 10 chai x 50ml)',
      price: 680000,
      originalPrice: 800000,
      imageUrl: './../../../assets/images/ong-superior-collagen-10000mg-hop-10-chai-50ml.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Bộ đôi tăng cường đề kháng Tảo xoắn Algae 2200 viên và Vitamin C DHC 120 viên',
      price: 1890000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/oan-algae-2200-vien-va-vitamin-c-dhc-120-vien4.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Combo 2 gói viên uống rau củ DHC Nhật Bản 240 viên',
      price: 680000,
      originalPrice: 800000,
      imageUrl: './../../../assets/images/vien-uong-japan.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Tảo vàng cao cấp Spirulina EX 2000 viên',
      price: 1890000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/3-hop-tao-vang-cao-cap-spirulina-ex-2000-vien.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
  ];

  slideConfig = { slidesToShow: 5, slidesToScroll: 5, dots: false, infinite: true };

  itemsHotBrand: any = [
    { name: 'ORIHIRO', },
    { name: '82x', },
    { name: 'TRANSINO', },
    { name: 'ANESSA', },
  ];
  activeItemIndex: number = 0;
  productsHotBrand: any = [];
  productsHotBrandOriHiro: any = [
    {
      name: 'Viên uống hỗ trợ điều trị tai biến Orihiro Nattokinase 2000FU 60 viên (Chính hãng)',
      price: 356000,
      originalPrice: 950000,
      imageUrl: './../../../assets/images/dieu-tri-tai-bien-orihiro-nattokinase-2000fu.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Tinh chất hàu tươi hỗ trợ tăng cường sinh lực nam Orihiro 120 viên (Chính hãng)',
      price: 656000,
      originalPrice: 950000,
      imageUrl: './../../../assets/images/hau-tuoi-120-vien-orihiro-bo-than-trang-duong.jpg',
      discount: 18,
      rating: 5,
      reviews: 1124,
    },
    {
      name: 'Viên uống bổ mắt Omega-3 Orihiro 180 viên (Chính hãng)',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/vien-uong-bo-mat-omega-3.jpg',
      discount: 15,
      rating: 5,
      reviews: 10224,
    },
    {
      name: 'Dầu gan cá 100% Squalene Orihiro 360 viên (Chính hãng)',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/tinh-dau-ca.jpg',
      discount: 15,
      rating: 5,
      reviews: 7024,
    },
    {
      name: 'Tinh chất hàu tươi - tỏi - nghệ hỗ trợ tăng cường sinh lực nam Orihiro 180 viên (Chính hãng)',
      price: 560000,
      originalPrice: 610000,
      imageUrl: './../../../assets/images/tinh-chat-hau-tuoi.jpg',
      discount: 15,
      rating: 5,
      reviews: 8022,
    },
    {
      name: 'Viên uống giảm cân Orihiro Night Diet (Hộp 60 gói x 6 viên)',
      price: 860000,
      originalPrice: 910000,
      imageUrl: './../../../assets/images/giam-can-orihiro-night-diet-hop-60-goi-x-6-vien.jpg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Viên uống giảm cân Orihiro Night Diet (Hộp 60 gói x 6 viên)',
      price: 480000,
      originalPrice: 515000,
      imageUrl: './../../../assets/images/vien-uong-tri-khop-glucosamin-900-vien.jpg',
      discount: 15,
      rating: 4,
      reviews: 8412,
    },
    {
      name: 'Viên uống bổ xương khớp Glucosamine Orihiro Hyaluronic Acid 270 viên',
      price: 950000,
      originalPrice: 985000,
      imageUrl: './../../../assets/images/xuong-khop-270.jpg',
      discount: 15,
      rating: 4,
      reviews: 462,
    },
    {
      name: 'Nấm Agaricus Matsutake Orihiro Nhật Bản 432 viên',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/nam-agaricus-matsutake-432-vien-orihiro.jpg',
      discount: 15,
      rating: 5,
      reviews: 574,
    },
    {
      name: 'Viên uống hỗ trợ nở ngực Orihiro BBB Best Body Beauty 330 viên (Chính hãng)',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/vien-uong-no-nguc-0.webp',
      discount: 15,
      rating: 5,
      reviews: 7142,
    },
    {
      name: 'Viên uống giảm cân Orihiro Amino Body Diet 300 viên',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/diet-300-vien-sieu-thi-nhat-ban-japana.jpeg',
      discount: 15,
      rating: 5,
      reviews: 4041,
    },
    {
      name: 'Sữa ong chúa Orihiro Nhật Bản 120 viên',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/ong-chua-orihiro-sieu-thi-nhat-ban-japana-2.jpeg',
      discount: 14,
      rating: 5,
      reviews: 3049,
    }
  ];
  productsHotBrand82X: any = [
    {
      name: 'Nước uống Collagen Mashiro 82x Classic New 120.000mg 500ml',
      price: 1356000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/82x_01.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Nước uống tinh chất nhau thai Placenta Mashiro 82x Sakura Premium New 450.000mg 500ml',
      price: 2656000,
      originalPrice: 2950000,
      imageUrl: './../../../assets/images/82x_02.jpg',
      discount: 18,
      rating: 5,
      reviews: 1124,
    },
    {
      name: 'Nước uống tinh chất nhau thai Placenta Mashiro 82x Classic 450.000mg 500ml',
      price: 2257000,
      originalPrice: 2390000,
      imageUrl: './../../../assets/images/82x_03.jpg',
      discount: 15,
      rating: 5,
      reviews: 10224,
    },
    {
      name: 'Nước uống Collagen Mashiro 82x Sakura Premium 120.000mg 500ml',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/82x_04.jpg',
      discount: 15,
      rating: 5,
      reviews: 7024,
    },
    {
      name: 'Combo 2 chai tinh chất nhau thai Placenta Mashiro 82x Sakura Premium 450.000mg 500ml',
      price: 5600000,
      originalPrice: 6100000,
      imageUrl: './../../../assets/images/82x_05.jpg',
      discount: 15,
      rating: 5,
      reviews: 8022,
    },
    {
      name: 'Combo 2 chai tinh chất nhau thai Placenta Mashiro 82x Classic 450.000mg 500ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/82x_06.jpg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Combo 2 chai nước uống Collagen Mashiro 82x Sakura Premium 120.000mg 500ml',
      price: 4480000,
      originalPrice: 4515000,
      imageUrl: './../../../assets/images/82x_07.jpg',
      discount: 15,
      rating: 4,
      reviews: 8412,
    },
    {
      name: 'Bộ đôi nước uống Collagen và tinh chất nhau thai Placenta Mashiro 82x Sakura 500ml',
      price: 950000,
      originalPrice: 985000,
      imageUrl: './../../../assets/images/82x_08.jpg',
      discount: 15,
      rating: 4,
      reviews: 462,
    },
    {
      name: 'Bộ đôi nước uống Collagen và tinh chất nhau thai Placenta Mashiro 82x Classic 500ml',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/82x_09.jpg',
      discount: 15,
      rating: 5,
      reviews: 574,
    },
    {
      name: 'Combo 2 chai nước uống Collagen Mashiro 82x Classic 120.000mg 500ml',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/82x_10.jpg',
      discount: 15,
      rating: 5,
      reviews: 7142,
    },
    {
      name: 'Liệu trình xóa nám, da sáng bật tông cùng Collagen & Placenta Mashiro 82x 500ml',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/82x_11.jpeg',
      discount: 15,
      rating: 5,
      reviews: 4041,
    },
    {
      name: 'Liệu trình đẹp thần sầu, giấu tuổi tác cùng Collagen & Placenta Mashiro 82x 500ml',
      price: 510000,
      originalPrice: 555000,
      imageUrl: './../../../assets/images/82x_12.jpeg',
      discount: 14,
      rating: 5,
      reviews: 3049,
    }
  ];

  itemsFamily: any = [
    { name: 'Phòng ngừa ung thư', },
    { name: 'Mẹ & bé', },
    { name: 'Sức khỏe người lớn tuổi', },
    { name: 'Đồ gia dụng', },
  ];
  activeItemFamilyIndex: number = 0;
  productsFamily: any = [];
  productsFamilyUT: any = [
    {
      name: 'Viên uống hỗ trợ điều trị ung thư Kanehide Bio Okinawa Fucoidan xanh 180 viên (Nội địa)',
      price: 1356000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/thuc-pham-ho-tro-dieu-tri-ung-thu-okinawa-fucoidan.webp',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Viên uống Fucoidan Okinawa Kanehide Bio EX 323mg 150 viên ',
      price: 2656000,
      originalPrice: 2950000,
      imageUrl: './../../../assets/images/an-ex-150-vien-sieu-thi-nhat-ban-japana.jpeg',
      discount: 18,
      rating: 5,
      reviews: 1124,
    },
    {
      name: 'Viên uống hỗ trợ điều trị ung thư Fine Japan Fucoidan 30 viên',
      price: 2257000,
      originalPrice: 2390000,
      imageUrl: './../../../assets/images/vien-uong-gia-dinh-03.jpg',
      discount: 15,
      rating: 5,
      reviews: 10224,
    },
    {
      name: 'Nước uống hỗ trợ điều trị ung thư Fucoidan Umi No Shizuku (3 hộp x 10 chai x 50ml)',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/hu-fucoidan-umi-no-shizuku-hop-10-chai-x-50ml9.jpg',
      discount: 15,
      rating: 5,
      reviews: 7024,
    },
    {
      name: 'Viên uống hỗ trợ điều trị ung thư Fucoidan Umi No Shizuku 120 viên (Nội địa Nhật Bản)',
      price: 5600000,
      originalPrice: 6100000,
      imageUrl: './../../../assets/images/noi-dia-nhat-ban-sieu-thi-nhat-ban-japana-1.jpeg',
      discount: 15,
      rating: 5,
      reviews: 8022,
    },
    {
      name: 'Thực phẩm hỗ trợ điều trị ung thư Nano Fucoidan Extract Granule (Hộp 2g x 60 gói - Nội địa)',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/thufucoidan-nano-sieu-thi-nhat-ban-japana-1.jpeg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    }
  ];
  productsFamilyMamaAndBaby: any = [
    {
      name: 'Viên uống hỗ trợ tăng chiều cao GH Gold Nhật Bản 120 viên',
      price: 1356000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/mama-baby1.jpg',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Bộ đôi phát triển toàn diện cho bé Viên rau củ DHC và tăng chiều cao GH Gold ',
      price: 2656000,
      originalPrice: 2950000,
      imageUrl: './../../../assets/images/be-vien-rau-cu-dhc-va-tang-chieu-cao-gh-gold48.jpg',
      discount: 18,
      rating: 5,
      reviews: 1124,
    },
    {
      name: 'Viên uống tăng chiều cao GH Creation EX+ 270 viên (Chính hãng)',
      price: 2257000,
      originalPrice: 2390000,
      imageUrl: './../../../assets/images/vien-uong-gia-dinh-03.jpg',
      discount: 15,
      rating: 5,
      reviews: 10224,
    },
    {
      name: 'Sữa tăng chiều cao dành cho bé Ichiban Boshi Asumiru 180g (Vị cacao)',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/chieu-cao-asumiru-ichiban-boshi-cho-tre-180-g.jpg',
      discount: 15,
      rating: 5,
      reviews: 7024,
    },
    {
      name: 'Sữa tắm em bé Little Dragon Calm Baby Wash Chai 250ml',
      price: 5600000,
      originalPrice: 6100000,
      imageUrl: './../../../assets/images/sua-tam-em-be-little-dragon-calm-chai-250ml01.jpg',
      discount: 15,
      rating: 5,
      reviews: 8022,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/ng-da-em-be-diu-nhe-little-dragon-tuyp-100ml02.jpg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    }
  ];

  listProductBestSellingBrand: any = [
    {
      name: 'Viên uống hỗ trợ tăng chiều cao GH Gold Nhật Bản 120 viên',
      price: 1356000,
      originalPrice: 1950000,
      imageUrl: './../../../assets/images/best-selling-brand1.webp',
      discount: 15,
      rating: 5,
      reviews: 11244,
    },
    {
      name: 'Bộ đôi phát triển toàn diện cho bé Viên rau củ DHC và tăng chiều cao GH Gold ',
      price: 2656000,
      originalPrice: 2950000,
      imageUrl: './../../../assets/images/best-selling-brand2.webp',
      discount: 18,
      rating: 5,
      reviews: 1124,
    },
    {
      name: 'Viên uống tăng chiều cao GH Creation EX+ 270 viên (Chính hãng)',
      price: 2257000,
      originalPrice: 2390000,
      imageUrl: './../../../assets/images/best-selling-brand3.webp',
      discount: 15,
      rating: 5,
      reviews: 10224,
    },
    {
      name: 'Sữa tăng chiều cao dành cho bé Ichiban Boshi Asumiru 180g (Vị cacao)',
      price: 356000,
      originalPrice: 390000,
      imageUrl: './../../../assets/images/best-selling-brand4.webp',
      discount: 15,
      rating: 5,
      reviews: 7024,
    },
    {
      name: 'Sữa tắm em bé Little Dragon Calm Baby Wash Chai 250ml',
      price: 5600000,
      originalPrice: 6100000,
      imageUrl: './../../../assets/images/best-selling-brand5.webp',
      discount: 15,
      rating: 5,
      reviews: 8022,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand6.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand7.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand8.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand9.jpg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand10.jpg',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand11.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand12.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand13.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    },
    {
      name: 'Kem dưỡng da em bé Little Dragon Soothing Baby Cream Tuýp 100ml',
      price: 4860000,
      originalPrice: 4910000,
      imageUrl: './../../../assets/images/best-selling-brand14.webp',
      discount: 15,
      rating: 4.5,
      reviews: 6412,
    }
  ];

  paramsSearchWithCategory = {
    "category_id": "",
    "product_name": "",
    "product_code": "",
    "page_number": "1",
    "page_size": "2",
    "sort_by": "",
    "sort_direction": "asc"
  }

  paramsSearchWithFamily = {
    "category_id": "",
    "product_name": "",
    "product_code": "",
    "page_number": "1",
    "page_size": "2",
    "sort_by": "",
    "sort_direction": "asc"
  }
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    // this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    // this.getCategories(1, 100);
    // this.productsHotBrand = this.productsHotBrandOriHiro;
    this.productsFamily = this.productsFamilyUT;
    this.onSearchProduct();
    this.getListCategories();
  }
  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      complete: () => {
        ;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((product: Product) => {
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
      },
      error: (error: any) => {
        ;
        console.error('Error fetching products:', error);
      }
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }
  // Hàm xử lý sự kiện khi sản phẩm được bấm vào
  onProductClick(productId: number) {

    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/products', productId]);
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }
  setActiveItem(index: number, item: any): void {
    this.activeItemIndex = index;
    this.paramsSearchWithCategory.category_id = item.category_id;
    this.onSearchProductByCategoryWithHotBranch();
  }

  setActiveItemFamily(index: number, item: any): void {
    this.activeItemFamilyIndex = index;
    this.paramsSearchWithFamily.category_id = item.category_id;
    this.onSearchProductByCategoryWithFamily();
  }


  getListCategories() {
    let param = {
      "type": ["PRODUCT_CATEGORY"]
    }

    this.categoryService.getListCategoryType(param).subscribe({
      next: (categories) => {
        this.categories = categories;
        this.itemsHotBrand = categories.result_data.categoryInfo;
        this.itemsFamily = categories.result_data.categoryInfo;
        this.paramsSearchWithCategory.category_id = this.itemsHotBrand[0]?.category_id;
        this.paramsSearchWithFamily.category_id = this.itemsFamily[0]?.category_id;
        this.onSearchProductByCategoryWithHotBranch();
        this.onSearchProductByCategoryWithFamily();
      },
      complete: () => {
        ;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  params = {
    "product_name": "",
    "product_code": "",
    "page_number": 1,
    "page_size": 10,
    "sort_by": "productName",
    "sort_direction": "asc"
  }

  onSearchProduct() {

    this.productService.getProductsAll(this.params).subscribe({
      next: (value) => {

        let paramsAll = { ...this.params };
        paramsAll.page_size = value.result_data.total_records;
        this.productService.getProductsAll(paramsAll).subscribe({
          next: (valueAll) => {
            this.products = valueAll.result_data.list_product;
            this.products.forEach((x: any) => {
              if (x.image) {
                this.getImageById(x.image).then((result) => {
                  x.srcImage = result;
                }).catch((error) => {
                  console.error('Error fetching image:', error);
                });
              }
            })
          }
        })
      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
  getImageById(file_id: string): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      this.productService.getOriginalImage(file_id).subscribe({
        next: (imageBlob) => {
          if (imageBlob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject(new Error('Failed to read the file'));
            };
            reader.readAsDataURL(imageBlob);
          } else {
            reject(new Error('No image blob received'));
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  onSearchProductByCategoryWithHotBranch() {
    this.productService.getProductsAllByCategory(this.paramsSearchWithCategory).subscribe({
      next: (value) => {
        this.productsHotBrand = value.result_data.list_product;
        this.productsHotBrand.forEach((x: any) => {
          if (x.image) {
            this.getImageById(x.image).then((result) => {
              x.srcImage = result;
            }).catch((error) => {
              console.error('Error fetching image:', error);
            });
          }
        })

      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }

  onSearchProductByCategoryWithFamily() {
    this.productService.getProductsAllByCategory(this.paramsSearchWithFamily).subscribe({
      next: (value) => {
        this.productsFamily = value.result_data.list_product;
        this.productsFamily.forEach((x: any) => {
          if (x.image) {
            this.getImageById(x.image).then((result) => {
              x.srcImage = result;
            }).catch((error) => {
              console.error('Error fetching image:', error);
            });
          }
        })

      },
      error: (error: any) => {
        ;
        alert(error.error.message);
      }
    })
  }
  routerLinkProduct(product: any) {
    this.router.navigate(['/product/'+ product.product_id]).then(() => {
      window.location.reload(); // Reload trang sau khi navigation
    });;
  }
}
