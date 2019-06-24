var mangNhanVien = [];

function getEle(id){
	return document.getElementById(id);
}

// Chuc nang them nhan vien 
function ThemNhanVien(){

	var isValidForm = true;

	var checkHo = kiemTraNhap('ho', 'tbHo', 'Vui lòng nhập Họ') && kiemTraText('ho', 'tbHo', 'Họ phải là chữ');
	isValidForm &= checkHo;

	// sai thằng đầu thì thằng sau ko chạy nữa
	var checkTen = kiemTraNhap('ten', 'tbTen', 'Vui lòng nhập Tên') && kiemTraDoDai('ten','tbTen', 50, 5);
	isValidForm &= checkTen;

	if (isValidForm) {		
		// B1: lay du lieu
		var maNV = getEle("msnv").value;
		var hoNV = getEle("ho").value;
		var tenNV = getEle("ten").value;
		var ngayBD = getEle("datepicker").value;
		var chucVu = getEle("chucvu").value;

		// B2: Tao doi tuong nhanvien	
		// tu khoa new de cho no hieu day la contructor 
		var nhanVien = new NhanVien(maNV, hoNV, tenNV, ngayBD, chucVu);
		nhanVien.TinhLuong();
		
		// B3: push nhanvien vao mang moi tao
		mangNhanVien.push(nhanVien);

		console.log(mangNhanVien);  
		HienThi(mangNhanVien);
	}
	else {
		alert('Dữ liệu chưa hợp lệ');
	}
	// kiemTraEmail('email', 'tbEmail', 'Vui lòng nhập lại Email' );
}

// ham hien thi
function HienThi(mangHienThi){
	var tbody = getEle("tbodyNhanVien");
	var content = "";
	for(var i = 0; i < mangHienThi.length; i++){
		var nhanVien = mangHienThi[i];
		// cái này là của IS6 cái buổi 13 là thuần js
		content += `
			<tr>
				<td>${i + 1}</td>
				<td>${nhanVien.MaNhanVien}</td>
				<td>${nhanVien.HoNhanVien} ${nhanVien.TenNhanVien}</td>
				<td>${nhanVien.ChucVu}</td>
				<td>${nhanVien.Luong}</td>
				<td>
					<button class = "btn btn-warning" onclick="layThongTinNhanVien('${nhanVien.MaNhanVien}')">Sửa</button>
					<button class = "btn btn-danger"  data-maNV = ${nhanVien.MaNhanVien} onclick="XoaNhanVien(event)">Xóa</button>
				</td>
			</tr>
			
		`
	 }
	 
	 tbody.innerHTML = content;
}

var layThongTinNhanVien = function(maNV){
	// var index = findIndex(maNV);
	// if(index !== 1){
	// 	return index;
	// }
	for(var i = 0; i < mangNhanVien.length; i++){
		var nhanVienCanTim;
		if(mangNhanVien[i].MaNhanVien === maNV){
			nhanVienCanTim = mangNhanVien[i];
			break; 
		}
	}

	//Gán giá trị vào form 
	getEle("msnv").value = nhanVienCanTim.MaNhanVien;
	getEle("ho").value = nhanVienCanTim.HoNhanVien;
	getEle("ten").value = nhanVienCanTim.TenNhanVien;
	getEle("datepicker").value = nhanVienCanTim.NgayBatDauLam;
	getEle("chucvu").value = nhanVienCanTim.ChucVu;

	// disable input mã nhân viên, không cho phép sửa
	getEle('msnv').setAttribute('readonly',true);

	// ẩn nút thêm và hiện nút cập nhật lên
	document.getElementById('btnThemNhanVien').style.display="none";
	document.getElementById('btn-group-edit').style.display="block";

}

// JSON: sau khi chuyển thuộc tính sẽ được dữ lại, phương thức sẽ bị mất đi

// lưu theo kiểu dữ liệu json 
function LuuThongTin(){
	//B1: Chuyển kiểu dữ liệu thành json nó bị mất cái phương thức ở đây
	var jsonMangNV = JSON.stringify(mangNhanVien);
	//B2: Thêm vào LS
	localStorage.setItem("DSNV", jsonMangNV);
}


// Lấy thông tin từ Local Storage
function LayThongTin(){
	//B1: lấy dữ liệu
	var jsonMangNV = localStorage.getItem("DSNV");
	//B2: Parse lại thành mảng
	mangNhanVien = JSON.parse(jsonMangNV);
	
	HienThi(mangNhanVien);
}

// cập nhật nhân viên 
var capNhatNhanVien = function(){
	// lấy thông tin người ta đã sửa từ form
	var maNV = getEle("msnv").value;
	var hoNV = getEle("ho").value;
	var tenNV = getEle("ten").value;
	var ngayBD = getEle("datepicker").value;
	var chucVu = getEle("chucvu").value;

	var nhanVien = new NhanVien(maNV, hoNV, tenNV, ngayBD, chucVu);
	nhanVien.TinhLuong();
	
	// dựa theo mã tìm vị trí nhân viên trong DS
	var index = findIndex(maNV);
	mangNhanVien[index] = nhanVien;

	// mangNhanVien.TinhLuong();
	// render lại giao diện
	HienThi(mangNhanVien);

	// Ẩn div btn-group-edit và hiện lại nút thêm
	document.getElementById('btn-group-edit').style.display="none";
	document.getElementById('btnThemNhanVien').style.display="block";

	// gỡ readonly khỏi cái input mã nhân viên
	getEle('msnv').removeAttribute('readonly');
}

// Xóa

//B1: Tìm được ID cần xóa
function findIndex(id){
	// var index = -1;
	for(var i = 0; i < mangNhanVien.length; i++){
		if(mangNhanVien[i].MaNhanVien === id){
			return i;
		}
	}
	return -1;
}

// Trong một thẻ
// có attribute(data-maNV) thuộc tính mềm có thể thay đổi
// có style(property) thuộc tính cứng không thể thay đổi

//B2: Xóa thật sự
function XoaNhanVien(event){
	// console.log(event);

	//Lấy giá trị mã nv từ thuộc tính data-maNV
	//Lấy thông qua sự kiện event
	var button_target = event.target; // Nơi xảy ra sự kiện
	var maNhanVien = button_target.getAttribute("data-maNV");

	var index = findIndex(maNhanVien);

	// tìm đc
	if(index !== -1){
		mangNhanVien.splice(index, 1);
		HienThi(mangNhanVien);
	}
}

// Tìm kiếm nhân viên 

// Tìm kiếm theo mã
// function TimKiemTheoMa(){
//     var DSCanTim = [];
//     //B1: lấy được mã nhân viên
//     var maNV = getEle("timKiem").value;
//     var index = findIndex(maNV);
//     //B2: Tìm được manv 
//     if(index !== -1){
//         DSCanTim.push(mangNhanVien[index]);
// 	}
	
// 	HienThi(DSCanTim);
// }

// cách khác để tạo ra function
// tìm kiếm theo mã hoặc tên
var timKiemNhanVien = function(){
	var danhSachTimKiem = [];
	var keyword = getEle("timKiem").value;
	for(var i = 0; i < mangNhanVien.length; i++){
		var hoTen = mangNhanVien[i].HoNhanVien + mangNhanVien[i].TenNhanVien;
		// keyword ở đây là chuỗi nhưng trong javascript nó cũng là object như number, button, ...
		// loại bỏ khoảng trống 2 đầu
		if(mangNhanVien[i].MaNhanVien === keyword || hoTen.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1){
			danhSachTimKiem.push(mangNhanVien[i]);	
		}
	}
	HienThi(danhSachTimKiem);
}
// có 3 sự kiện đi với bàn phím: keyup(nhấn vào keyboard rồi thả ra), keydown(chỉ nhấn vào keyboard), keypress(nhấn giữ bàn phím)
// khi xóa hết input rỗng thì nó hiện ra hết danh sách vì input rỗng là chứa tất cả các kí tự vì vậy nó show cả DS

var a = {
	HoTen: 'Dũng'
}
var b = a;
b.HoTen = "Hiếu";
// thực chất trỏ chung một vùng nhớ
// chỉ xảy ra với array và object
console.log(a); // Hiếu
console.log(b); // Hiếu

// cách sửa ko đem a gán cho b
var b = Object.assign({}, a);
b.HoTen = "Hiếu";

// javascript ko tự chạy trên browser thông qua html
// js engine - v8
// js code có 3 thành phần chính 
// parser: hiện ra -> error
// parser có 2 phần variable object và execution Context(xử lý code từng dòng từ trên xuống)
// trc khi chạy từ trên xuống js file sẽ quét tất cả các biến và lưu lại tại variable object
// gọi là cơ chế hoisting hay cơ chế đồng bộ(chạy từng dòng từ trên xuống) trong js

// transtfer: chuyển code sang mã máy
// execution

// BUỔI SAU: CƠ CHẾ BẤT ĐỒNG BỘ TRONG JS
setTimeout(function(){
	console.log('a');
},4000)
console.log('b');

//------------------- validation form--------------------- 
var kiemTraNhap = function(idInput, idSpan, message){
	//b1: Lấy đc input = dom tới input lấy value
	var value = getEle(idInput).value;
	//b2: kiểm tra độ dài của input, nếu >= 0 => true, ẩn thông báo, ngược lại => false, hiện thông báo
	if(value.length > 0){
		document.getElementById(idSpan).style.display='none';
		return true;
	}
	document.getElementById(idSpan).style.display="block";
	document.getElementById(idSpan).innerHTML= message;
	return false;
}

var kiemTraDoDai = function(idInput, idSpan, max, min){
	//b1: Lấy đc input = dom tới input lấy value
	var value = getEle(idInput).value;

	if(value.length > max || value.length < min){
		getEle(idSpan).style.display="block";
		getEle(idSpan).innerHTML=` Độ dài yêu cầu ừ ${min} tới ${max} kí tự `;	
		return false;
	}
	getEle(idSpan).style.display="none";
	return true;
}

// Regular expression: chỉ hướng dẫn sử dụng
var kiemTraText = function(idInput, idSpan, mess){
	//b1: Lấy đc input = dom tới input lấy value
	var value = getEle(idInput).value;

	//b2: Tạo ra một biểu thức chính quy để kiểm tra dữ liệu đầu vào
	// phải sửa Ề thành Ế, ề thành ế
	var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
	"ẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
	"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");

	//b3: Kiểm tra value dựa theo pattern 
	if(pattern.test( value )){
		getEle(idSpan).style.display = "none";
		return true;
	}
	getEle(idSpan).style.display = "block";
	getEle(idSpan).innerHTML = mess;
	return false;
}

var kiemTraEmail = function(idInput, idSpan, mess){
	//b1: Lấy đc input = dom tới input lấy value
	var value = getEle(idInput).value;
	
	var pattern = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
	+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

	if(pattern.test( value)){
		getEle(idSpan).style.display = "none";
		return true;
	}
	getEle(idSpan).style.display = "block";
	getEle(idSpan).innerHTML = mess;
	return false;
}

// cap nhat thong tin 
