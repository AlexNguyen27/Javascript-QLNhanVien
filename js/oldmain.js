var dsnv = new DanhSachNhanVien();
function ThemNhanVien(){

	//Mỗi lần thêm sinh viên mới thì xóa bảng cũ
	//var tables = document.getElementsByTagName("TABLE");
	//for (var i=tables.length-1; i>=0;i-=1)
	//	if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
	

	var ho = document.getElementById("ho").value;
	var ten = document.getElementById("ten").value;
	var msnv = document.getElementById("msnv").value;
	var ngaylam = document.getElementById("datepicker").value;
	var chucvu = document.getElementById("chucvu").value;
	var indexchucvu = document.getElementById("chucvu").selectedIndex;

	var divHienThi = document.getElementById("hienthi");
	divHienThi.innerHTML = "";
	var nv = new NhanVien(ho,ten, msnv, ngaylam, chucvu, indexchucvu);
	dsnv.ThemNhanVien(nv);
	dsnv.XuatLuong();

	//Tạo bảng
	var tagTable = document.createElement("table");
	tagTable.className = "table table-bordered table-hover text-center wow fadeInUp";
	tagTable.setAttribute('data-wow-duration',"1s");
	//tagTable.style.color ="#000";
	//tagTable.style.background = "rgba(255, 255, 255, 0.8)";

	var tagThead = document.createElement("thead");
	tagTable.appendChild(tagThead);

	var tagTR = document.createElement("tr");
	tagThead.appendChild(tagTR);

	var tagTh = document.createElement("th");
	var tagTh1 = document.createElement("th");
	var tagTh2 = document.createElement("th");
	var tagTh3 = document.createElement("th");
	var tagTh4 = document.createElement("th");
	var tagTh5 = document.createElement("th");

	var txtNode = document.createTextNode("Họ");
	var txtNode1 = document.createTextNode("Tên");
	var txtNode2 = document.createTextNode("MSNV");
	var txtNode3 = document.createTextNode("Ngày làm");
	var txtNode4 = document.createTextNode("Chức vụ");
	var txtNode5 = document.createTextNode("Lương");

	tagTh.appendChild(txtNode);
	tagTh1.appendChild(txtNode1);
	tagTh2.appendChild(txtNode2);
	tagTh3.appendChild(txtNode3);
	tagTh4.appendChild(txtNode4);
	tagTh5.appendChild(txtNode5);

	tagTR.appendChild(tagTh);
	tagTR.appendChild(tagTh1);
	tagTR.appendChild(tagTh2);
	tagTR.appendChild(tagTh3);
	tagTR.appendChild(tagTh4);
	tagTR.appendChild(tagTh5);

	

	for(var i=0; i<dsnv.mangNhanVien.length; i++){
		var tagTR = document.createElement("tr");
		tagTR.className ="wow fadeInUp";
		tagTR.setAttribute('data-wow-duration', i+0.5+"s");
		tagTable.appendChild(tagTR);

		for(var j=0; j<6; j++){
			var tagTD = document.createElement("td");

			nv.xuatNhanVienCaNhan(dsnv.mangNhanVien[i]);
			var txtNode = document.createTextNode(nv.mangNVCaNhan[j]);

			tagTD.appendChild(txtNode);
			tagTR.appendChild(tagTD);
		}
	}
	divHienThi.appendChild(tagTable);
	
}
function CheckKyTu(min, max, input, thongbao, contentThongBao){
	if(input.value == ""){
		thongbao.innerHTML = contentThongBao;
		input.style.border = "1px solid red";
		thongbao.style.display = "block";
	}else{
		var laso = /^[0-9]+$/;
		if(input.value.match(laso)){
			var inputSo = parseInt(input.value);
			if(inputSo<min || inputSo > max){
				input.style.border = "1px solid red";
				thongbao.innerHTML = "Vui lòng nhập điểm từ 0-10";
				thongbao.style.display = "block";
			}else{
				input.style.border = "1px solid #00c4ff";
				thongbao.innerHTML = "";
				thongbao.style.display = "none";
			}
		}else{
			thongbao.innerHTML = "Vui lòng nhập vào số";
			input.style.border = "1px solid red";
			thongbao.style.display = "block";
		}
	}
}
var setting = {
	inputHo: "Vui lòng nhập họ",
	inputTen: "Vui lòng nhập tên",
	inputMsnv: "Vui lòng nhập MSNV",
	inputNgayLam: "Vui lòng nhập ngày làm",
	inputChucVu: "Vui lòng chọn chức vụ",
};
function CheckData(input, thongbao, contentThongBao){
	if(input.value == ""){
		input.style.border = "1px solid red";
		thongbao.style.display = "block";
		thongbao.innerHTML = contentThongBao;
	}else{
		input.style.border = "1px solid #00c4ff";	
		thongbao.style.display = "none";
		thongbao.innerHTML = "";
	}
}
function CheckChucVu(input, thongbao, contentThongBao){
	if(input.selectedIndex == 0){
		input.style.border = "1px solid red";
		thongbao.style.display = "block";
		thongbao.innerHTML = contentThongBao;
	}else{
		input.style.border = "1px solid #00c4ff";	
		thongbao.style.display = "none";
		thongbao.innerHTML = "";
	}
}
function KiemTraMSNV(input, thongbao, contentThongBao, dsnv){
	if(input.value == ""){
		input.style.border = "1px solid red";
		thongbao.style.display = "block";
		thongbao.innerHTML = contentThongBao;
	}else{
		input.style.border = "1px solid #00c4ff";
		thongbao.innerHTML = "";	
		thongbao.style.display = "none";
		for(var i=0; i<dsnv.mangNhanVien.length; i++){
			if(input.value == dsnv.mangNhanVien[i].msnv){
				input.style.border = "1px solid red";
				thongbao.style.display = "block";
				thongbao.innerHTML = "MSNV đã tồn tại";
			}else{
				input.style.border = "1px solid #00c4ff";
				thongbao.innerHTML = "";	
				thongbao.style.display = "none";
			}
		}
		
	}
	
}
function KiemTraThemNhanVien(){
	var mangInput = [];
	var sp_thongbao = document.getElementsByClassName("sp-thongbao");

	var ho = document.getElementById("ho");
	var giaTriHo = ho.value;

	var ten = document.getElementById("ten");
	var giaTriTen = ten.value;

	var msnv = document.getElementById("msnv");
	var giaTriMsnv = msnv.value;

	var ngaylam = document.getElementById("datepicker");
	var giaTriNgayLam = ngaylam.value;

	var chucvu = document.getElementById("chucvu");
	var indexChucVu = chucvu.selectedIndex;

	mangInput = [ho, ten, msnv, chucvu];

	if(giaTriHo != "" && giaTriTen != "" && giaTriMsnv != "" && giaTriNgayLam != "" && indexChucVu != "0"){
		CheckData(ho, sp_thongbao[0], setting.inputHo);
		CheckData(ten, sp_thongbao[1], setting.inputTen);
		KiemTraMSNV(msnv, sp_thongbao[2], setting.inputMsnv, dsnv);
		CheckData(ngaylam, sp_thongbao[3], setting.inputNgayLam);
		CheckChucVu(chucvu, sp_thongbao[4], setting.inputChucVu);
		if(sp_thongbao[0].innerHTML =="" && sp_thongbao[1].innerHTML =="" && sp_thongbao[2].innerHTML =="" && sp_thongbao[3].innerHTML =="" && sp_thongbao[4].innerHTML ==""){
			ThemNhanVien();
			for(var i=0; i<mangInput.length; i ++){
				if(i==3){
					mangInput[i].style.border = "1px solid #00c4ff";
					mangInput[i].selectedIndex = "0";	
					mangInput[0].focus();
					sp_thongbao[i].style.display = "none";
				}else{
					mangInput[i].style.border = "1px solid #00c4ff";
					mangInput[i].value = "";	
					mangInput[0].focus();
					sp_thongbao[i].style.display = "none";
				}
			}
		}
		
		
	}else{
		CheckData(ho, sp_thongbao[0], setting.inputHo);
		CheckData(ten, sp_thongbao[1], setting.inputTen);
		CheckData(msnv, sp_thongbao[2], setting.inputMsnv);
		CheckData(ngaylam, sp_thongbao[3], setting.inputNgayLam);
		CheckChucVu(chucvu, sp_thongbao[4], setting.inputChucVu);
	}
}




function Add(){
	KiemTraThemNhanVien();
}