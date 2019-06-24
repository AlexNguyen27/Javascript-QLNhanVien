// dinh nghia lop doi tuong nhanvien
function NhanVien(ma, ho, ten ,ngaylam,chucvu){
	this.MaNhanVien = ma;
	this.HoNhanVien = ho;
	this.TenNhanVien = ten;
	this.NgayBatDauLam = ngaylam;
	this.ChucVu = chucvu;
    this.LuongCoBan = 500;
    this.Luong = 0;

    // mỗi khi gọi cái pt tính lương thì Luogn sẽ có giá trị
    this.TinhLuong = function () {
        if (this.ChucVu === "Sếp") {
            this.Luong = this.LuongCoBan * 3;
        }
        else if (this.ChucVu === "Trưởng phòng") {
            this.Luong = this.LuongCoBan * 2;
        }
        else if (this.ChucVu === "Nhân viên") {
            this.Luong = this.LuongCoBan * 1;
        }

    }
}

