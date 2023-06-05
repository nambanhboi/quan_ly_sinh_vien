import storage from "./storage.js"

class SinhVien {
    constructor(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa) {
        this.MaSV = MaSV
        this.TenSV = TenSV
        this.NgaySinh = NgaySinh
        this.GioiTinh = GioiTinh
        this.MaKhoa = MaKhoa
    }
}


class Khoa {
    constructor(MaKhoa, TenKhoa) {
        this.MaKhoa = MaKhoa
        this.TenKhoa = TenKhoa
    } 
    
}

const SinhViens = storage.get();
const Khoas = [
    {
        MaKhoa: 'CNTT',
        TenKhoa: 'Công nghệ thông tin'
    },
    {
        MaKhoa: 'DTVT',
        TenKhoa: 'Điện tử viễn thông'
    },
    {
        MaKhoa: 'KT',
        TenKhoa: 'Kinh tế'
    }
]

const btnThem = document.getElementById('them');
const btnSua = document.getElementById('sua');
const btnLamMoi = document.getElementById('lammoi');
const btnXoa = document.getElementById('xoa');
const btnTimKiem = document.getElementById('timkiem');
const table_sv = document.getElementById('table_sv');
const eMaSV = document.querySelector("input[name = 'txtMaSV']")
const chk_all = document.getElementById('check_all');
const txtTimKiem = document.querySelector('#txtTimKiem');
let index_dele = [];
let SinhViensSearch = [];

function getTenKhoa(maKhoa) {
    const indexKhoa = Khoas.findIndex(Khoa => Khoa.MaKhoa === maKhoa)
    return Khoas[indexKhoa].TenKhoa;
}

function render() {
    table_sv.innerHTML = ''
    SinhViens.forEach((sv, index) => {
        let tenKhoa = getTenKhoa(sv.MaKhoa);
        table_sv.innerHTML += `
            <tr class='${index}'>
                <td><input type="checkbox" class='check_one'></td>
                <td>${sv.MaSV}</td>
                <td>${sv.TenSV}</td>
                <td>${sv.NgaySinh}</td>
                <td>${sv.GioiTinh}</td>
                <td>${tenKhoa}</td>
                <td><i class="bi bi-pen edit"></i></td>
                <td><i class="bi bi-trash3 delete"></i></td>
            </tr>
        `
    })
    XoaSinhVien();
    fillInfo();
}

function renderSearch() {
    table_sv.innerHTML = ''
    SinhViensSearch.forEach((sv) => {
        let tenKhoa = getTenKhoa(sv.MaKhoa);
        table_sv.innerHTML += `
            <tr class='${sv.index_old}'>
                <td><input type="checkbox" class='check_one'></td>
                <td>${sv.MaSV}</td>
                <td>${sv.TenSV}</td>
                <td>${sv.NgaySinh}</td>
                <td>${sv.GioiTinh}</td>
                <td>${tenKhoa}</td>
                <td><i class="bi bi-pen edit"></i></td>
                <td><i class="bi bi-trash3 delete"></i></td>
            </tr>
        `
    })
    XoaSinhVien();
    fillInfo();
}

Lammoi();

chk_all.addEventListener('click', function() {

    if(chk_all.checked === true) {
        document.querySelectorAll('.check_one').forEach(chk => {
            if(chk.checked === false) {
                chk.checked = true
            }  
        })
    }
    else {
        document.querySelectorAll('.check_one').forEach(chk => {
            if(chk.checked === true) {
                chk.checked = false
            }  
        })
    }
})

function XoaAll() {
    index_dele = [];
    document.querySelectorAll('.check_one').forEach(chk => {
        if(chk.checked == true) {
            const index = chk.parentElement.parentElement.className;
            index_dele.push(index);
        }  
    })
    if(index_dele.length == 0) {
        alert('Vui lòng chọn sinh viên cần xóa!')
    }
    else {
        let cfm = confirm('bạn có muốn xóa các sinh viên đã chọn không?')
        if(cfm == true) {
            for(let i = index_dele.length-1; i>=0;i--) {
                SinhViens.splice(index_dele[i],1);
            }
            storage.set(SinhViens);
            Lammoi();
        }
    }
}

function fillInfo() {
    document.querySelectorAll('.edit').forEach(edt => {
        edt.addEventListener('click', function() {
            const index = edt.parentElement.parentElement.className;
            eMaSV.value = SinhViens[index].MaSV
            eMaSV.disabled = true;
            document.querySelector("input[name = 'txtTenSV']").value = SinhViens[index].TenSV
            document.querySelector("input[name = 'txtNgaySinh']").value =SinhViens[index].NgaySinh
            const radios = document.querySelectorAll(`input[name='rdbGioiTinh']`);
            radios.forEach(radio => {
                if (radio.value === SinhViens[index].GioiTinh && !radio.checked) {
                    radio.checked = true;
                } else if (radio.value !== SinhViens[index].GioiTinh && radio.checked) {
                    radio.checked = false;
                }
            });
    
            document.querySelector("select[name = 'drpKhoa']").value = SinhViens[index].MaKhoa
    
            btnSua.disabled = false
        })
    })
}

function XoaSinhVien() {
    document.querySelectorAll('.delete').forEach(del => {
        del.addEventListener('click', function() {
            let conf = confirm('bạn có muốn xóa không')
            if(conf == true) {
                const index = del.parentElement.parentElement.className;
                SinhViens.splice(index,1);
                storage.set(SinhViens);
                Lammoi();
            }
        })
    })
}



function Lammoi() {
    document.querySelectorAll('input[type="text"]').forEach(inp => {
        inp.value = ''
    })
    document.querySelector('input[type="date"]').value = ''
    btnSua.disabled = true;
    eMaSV.disabled = false;
    chk_all.checked = false;
    render();
}

function ThemSinhVien() {
    const MaSV = document.querySelector("input[name = 'txtMaSV']").value
    const TenSV = document.querySelector("input[name = 'txtTenSV']").value
    const NgaySinh = document.querySelector("input[name = 'txtNgaySinh']").value
    const GioiTinh = document.querySelector("input[name = 'rdbGioiTinh']:checked").value
    const MaKhoa = document.querySelector("select[name = 'drpKhoa']").value
    console.log(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa)
    // const indexKhoa = Khoas.findIndex(Khoa => Khoa.TenKhoa === TenKhoa)
    // const MaKhoa = Khoas[indexKhoa].MaKhoa;
    const indexSV = SinhViens.findIndex(sv => sv.MaSV === MaSV);
    if(indexSV != -1) {
        alert('Ma sinh vien đã tồn tại vui long nhap lại');
    }
    else if(MaSV === '' || TenSV === '' || NgaySinh === '') {
        alert('vui lòng nhập các trường bỏ trống')
    }
    else {
        let sv = new SinhVien(MaSV, TenSV, NgaySinh, GioiTinh, MaKhoa);
        SinhViens.push(sv);
        storage.set(SinhViens);
        Lammoi();
    }
}





btnThem.addEventListener('click', ThemSinhVien)
btnLamMoi.addEventListener('click', Lammoi)
btnSua.addEventListener('click', SuaSinhVien)
btnXoa.addEventListener('click', XoaAll)
btnTimKiem.addEventListener('click', timKiem)

txtTimKiem.addEventListener('input', function(e) {
    if(txtTimKiem.value === '') {
        render();
    }
})




function SuaSinhVien() {
    const MaSV = document.querySelector("input[name = 'txtMaSV']").value
    const TenSV = document.querySelector("input[name = 'txtTenSV']").value
    const NgaySinh = document.querySelector("input[name = 'txtNgaySinh']").value
    const GioiTinh = document.querySelector("input[name = 'rdbGioiTinh']:checked").value
    const MaKhoa = document.querySelector("select[name = 'drpKhoa']").value
    const IndexSV = SinhViens.findIndex(sv => sv.MaSV === MaSV)
    SinhViens[IndexSV].TenSV = TenSV;
    SinhViens[IndexSV].NgaySinh = NgaySinh;
    SinhViens[IndexSV].GioiTinh = GioiTinh;
    SinhViens[IndexSV].MaKhoa = MaKhoa;
    storage.set(SinhViens);
    Lammoi();
}

function timKiem() {
    let valueTimKiem = txtTimKiem.value;

    SinhViensSearch = SinhViens.map((sv, index_old) => {
        return {...sv, index_old}
    }).filter(sv => {
        return sv.TenSV.toUpperCase().includes(valueTimKiem.toUpperCase()) ||
        sv.MaSV.toUpperCase().includes(valueTimKiem.toUpperCase()) ||
        sv.NgaySinh.toUpperCase().includes(valueTimKiem.toUpperCase()) ||
        sv.GioiTinh.toUpperCase().includes(valueTimKiem.toUpperCase()) ||
        sv.MaKhoa.toUpperCase().includes(valueTimKiem.toUpperCase())
    })

    console.log(SinhViensSearch)
    renderSearch();
}
