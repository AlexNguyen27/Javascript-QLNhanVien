function NhanVien(ho,ten,msnv,ngaylam,chucvu,indexchucvu){
	this.ho = ho;
	this.ten = ten;
	this.msnv = msnv;
	this.ngaylam = ngaylam;
	this.chucvu = chucvu;
	this.indexchucvu = indexchucvu;
	this.luongcoban = 500;
	this.phucap = 50;
	this.luong = 0;

	this.tinhLuong = function(){
		if(this.indexchucvu == "1"){
			return this.luong = 2.0 * this.luongcoban + this.phucap + " $";
		}else if(this.indexchucvu == "2"){
			return this.luong = 1.5 * this.luongcoban + this.phucap + " $";
		}else{
			return this.luong = 1.0 * this.luongcoban + this.phucap + " $";
		}
	};
	this.xuatNhanVienCaNhan = function(sv){
		var mangNVCaNhan = [];
		this.mangNVCaNhan = [sv.ho, sv.ten, sv.msnv, sv.ngaylam, sv.chucvu, sv.luong];
	};
}