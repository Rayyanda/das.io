//var imgHero = document.getElementById('imgHero-rel')
// var rel = document.getElementById('relative-column');
// if (devicePixelRatio <= 768) {
//     rel.classList.replace('justify-content-end','justify-content-center');
// }

//function untuk mengubah isi modal
function changeModalContent(id) {
    var modalTitle = document.getElementById('productModalLabel');
    var modalDataTitle = document.getElementById('dataTitle');
    var modalDataHarga = document.getElementById('dataHarga');
    var modalContent = document.getElementById('modal-content');
    var modalHeader = document.getElementById('modal-header');
    var modalBody = document.getElementById('modal-body');
    var modalFooter = document.getElementById('modal-footer');
    var modalText = document.getElementById('modal-text');
    var modalButton = document.getElementById('modal-button');
    var modalButton2 = document.getElementById('modal-button2');


    //mengubah value
    modalTitle.innerText = dataProduct[id].nama;
    modalDataTitle.innerText = dataProduct[id].nama;
    modalDataHarga.innerText = formatRupiah(dataProduct[id].harga);
    
    mapCicilan(dataProduct[id].cicilan);
    mapBenefit(dataProduct[id].kelebihan);
    carouselCard(dataProduct[id].gambar);
}

//fungsi untuk membuat carousel gambar pada card
function carouselCard(data) {
  var carouselCard = document.getElementById('carousel-data');
  carouselCard.innerHTML = "";

  data.forEach((gambar, index)=>{
    //membuat carousel item container
    var carouselItemContainer = document.createElement('div');
    if(index == 0){
      carouselItemContainer.classList.add('carousel-item', 'active');
    }else{
      carouselItemContainer.classList.add('carousel-item');
    }

    //set atribut
    carouselItemContainer.setAttribute('data-bs-interval','10000')

    //memuat gambar
    var carouselImage = document.createElement('img');
    carouselImage.classList.add('d-block','w-100');
    carouselImage.src = `./images/${gambar.file}`;
    carouselImage.alt = gambar.file;

    //membuat element div untuk caption
    var carouselCaption = document.createElement('div');
    carouselCaption.classList.add('carousel-caption','d-none','d-md-block');

    //membuat elemen untuk caption
    var carouselCaptionText = document.createElement('p');
    carouselCaptionText.classList.add('mb-0');
    carouselCaptionText.innerText = gambar.nama;

    carouselCaption.appendChild(carouselCaptionText);

    //menambahkan carousel item ke carousel container
    carouselItemContainer.appendChild(carouselImage);
    
    //menambahkan carousel caption ke carousel container
    carouselItemContainer.appendChild(carouselCaption);

    //menambahkan carousel container kedalam carousel card
    carouselCard.appendChild(carouselItemContainer);

  });
}

//fungsi untuk map benefit
function mapBenefit(data){
  var benefitContainer = document.getElementById('produkBenefit');
  benefitContainer.innerHTML = "";

  data.forEach((benefit)=>{
    var txtBenefit = document.createElement('p');
    txtBenefit.classList.add('mb-0');

    txtBenefit.innerHTML = `<span class="text-${benefit.color}"><i class="bi ${benefit.icon}"></i></span> ${benefit.benefit}`;
    benefitContainer.appendChild(txtBenefit);
  });
}


//fungsi untuk map cicilan
function mapCicilan(data) {
  var cicilan = data;
  var badgeCicilan = document.getElementById('cicilanBadge');
  var cicilanPerBln = document.getElementById('cicilanPerBln');
  badgeCicilan.innerHTML = "";
  cicilanPerBln.innerHTML = "<i>pilih jumlah tahun cicilan</i>"
  
  data.forEach((cicilan)=>{
    var buttonCicilan = document.createElement("button");
    buttonCicilan.classList.add('btn','btn-secondary','m-2','btn-sm');

    buttonCicilan.innerText = `${cicilan.jmlTahun} Tahun`

    buttonCicilan.addEventListener('click',()=>{
      cicilanPerBln.innerText = formatRupiah(cicilan.perBln)
    });

    badgeCicilan.appendChild(buttonCicilan);
  });
  
}

// Fungsi untuk menampilkan produk ke dalam HTML
function tampilkanProduk() {
    var productList = document.getElementById('productList');
    var container = document.getElementById("produk-container");

    dataProduct.forEach((produk, index) => {
        var card = document.createElement("div");
        var produkElement = document.createElement("div");
        card.classList.add('card','mb-3','shadow', 'card-product');
        produkElement.classList.add("card-body");
        card.appendChild(produkElement);

        produkElement.innerHTML = `<div class="row my-2">
      <div class="col-md-5">
        <div class="d-flex justify-content-center">
            <div class="image-container">
              <img src="./images/${produk.gambar[0].file}" class="rounded img-product img-thumbnail" alt="">
            </div>
        </div>
      </div>
      <div class="col-md-7 d-flex flex-column">
        <h3 class="fs-2">${produk.nama}</h3>
        <p class="fs-6">${produk.deskripsi}</p>
        <div>
          <button class="btn btn-outline-success" onclick="changeModalContent(${index})" data-bs-toggle="modal" data-bs-target="#productModal" type="button">Lihat Detail <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div>`;

        productList.appendChild(card);
    });
}

// Panggil fungsi untuk menampilkan produk saat halaman dimuat
document.addEventListener("DOMContentLoaded", tampilkanProduk);

const cardContainer = document.getElementById('productList');
const cardProduct = document.querySelectorAll('.card-product');


function checkVisibility() {
  const boxPosition = cardContainer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Jika elemen masuk ke viewport
  if (boxPosition.top < viewportHeight && boxPosition.bottom >= 0) {
    cardProduct.forEach(elemen =>{
      elemen.classList.add('visible');
    })
    window.removeEventListener('scroll', checkVisibility); // Hentikan listener setelah animasi dipicu
  }
}

window.addEventListener('scroll', checkVisibility);

function formatRupiah(angka) {
    // Mengonversi angka ke string dan membaliknya untuk memudahkan pemisahan ribuan
    let numberString = angka.toString();
    let sisa = numberString.length % 3;
    let rupiah = numberString.substr(0, sisa);
    let ribuan = numberString.substr(sisa).match(/\d{3}/g);
  
    // Menambahkan titik sebagai pemisah ribuan
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
  
    // Mengembalikan hasil dengan menambahkan "Rp" di depan
    return `Rp ${rupiah}`;
}

//data produk
var dataProduct = [
    {
        "id": 1,
        "nama": "Kav. Dynamic Sejahtera",
        "harga": 320000000,
        "gambar": [
          {'file': 'kds-tampak-depan.jpg','nama': 'Tampak Depan'},
          {'file': 'kds-dapur.jpg','nama':'Dapur'},
          {'file': 'kds-kamar-mandi.jpg','nama':'Kamar Mandi'},
          {'file': 'kds-kamar.jpg','nama':'Kamar 1'},
          {'file': 'kds-kamar2.jpg','nama':'Kamar 2'},
          {'file': 'kds-ruang-tamu.jpg','nama':'Ruang Tamu'},
        ],
        "cicilan" : [
            {"jmlTahun": 5, "perBln": 5400000},
            {"jmlTahun": 10, "perBln": 2670000},
            {"jmlTahun": 15, "perBln": 1779000},
            {"jmlTahun": 20, "perBln": 1445000}
        ],
        "kelebihan" : [
          {'icon' : 'bi-check-circle-fill','color':'success' ,'benefit':'Benefit 1'},
          {'icon' : 'bi-geo-alt','color':'secondary' ,'benefit':'Benefit 2'},
          {'icon' : 'bi-check-circle-fill','color':'danger' ,'benefit':'Benefit 3'},
          {'icon' : 'bi-check-circle-fill','color':'primary' ,'benefit':'Benefit 4'},
          {'icon' : 'bi-check-circle-fill','color':'light' ,'benefit':'Benefit 5'},
          
        ],
        "sukuBunga" : "5%/thn",
        "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis saepe et ipsum ex perspiciatis quae, optio ipsam rerum consectetur tempore voluptates, est odit, architecto in suscipit ducimus dolorem molestiae!",
    },
    {
        "id": 1,
        "nama": "Pesona Ariana",
        "harga": 320000000,
        "gambar": [
          {'file': 'ariana-tampak-depan.jpg','nama':'Tampak Depan'},
          {'file': 'ariana-dapur.jpg','nama':'Dapur'},
          {'file': 'ariana_kamar-mandi.jpg','nama':'Kamar Mandi'},
          {'file': 'ariana-kamar.jpg','nama':'Kamar 1'},
          {'file': 'ariana-kamar-2.jpg','nama':'Kamar 2'},
          {'file': 'ariana-ruang-tamu.jpg','nama':'Ruang Tamu'},

        ],
        "cicilan" : [
            {"jmlTahun": 5, "perBln": 5400000},
            {"jmlTahun": 10, "perBln": 2670000},
            {"jmlTahun": 15, "perBln": 1779000},
            {"jmlTahun": 20, "perBln": 1445000}
        ],
        "kelebihan" : [
          {'icon' : 'bi-check-circle-fill','color':'success' ,'benefit':'Benefit 1'},
          {'icon' : 'bi-check-circle-fill','color':'secondary' ,'benefit':'Benefit 2'},
          {'icon' : 'bi-check-circle-fill','color':'danger' ,'benefit':'Benefit 3'},
          {'icon' : 'bi-check-circle-fill','color':'primary' ,'benefit':'Benefit 4'},
          {'icon' : 'bi-check-circle-fill','color':'light' ,'benefit':'Benefit 5'},
          
        ],
        "sukuBunga" : "5%/thn",
        "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis saepe et ipsum ex perspiciatis quae, optio ipsam rerum consectetur tempore voluptates, est odit, architecto in suscipit ducimus dolorem molestiae!",
    },
    
]