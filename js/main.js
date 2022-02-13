var dsnv = [];

var dsnvJson = localStorage.getItem("dsnvLocal");
// if (dssvJson !== null) {
if (dsnvJson) {
  console.log(dsnvJson);
  var dsnvLocal = JSON.parse(dsnvJson);

  dsnv = dsnvLocal.map(function (sv) {
    return new SinhVien(sv.ma, sv.ten, sv.email, sv.phone);
  });
  renderTable(dsnv);
}

function luuDataLocal() {
  var dsnvJson = JSON.stringify(dsnv);
  localStorage.setItem("dsnvLocal", dsnvJson);
}

function themNV() {
  var ma = document.getElementById("txtStt").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var phone = document.getElementById("txtPhone").value;

  var nhanVien = new NhanVien(ma, ten, email, phone);
  console.log("nhanVien", nhanVien);
  var isValid = kiemTraRong("txtStt", "spanStt") & kiemTraRong("txtTenNV","spanTenNV");
  //su dung 1 dau & (cai dau` tien sai thi cai sau van chay.)
  if (isValid) {
    dsnv.push(nhanVien);
    renderTable(dsnv);
    luuDataLocal();
    console.log(dsnv);
  }
}
function timKiemNV(Stt) {
  for (var index = 0; index < dsnv.length; index++) {
    if (dsnv[index].ma * 1 === Stt * 1) {
      return index;
    }
  }
}

function xoaNV(Stt) {
  var index = timKiemNV(Stt);
  dsnv.splice(index, 1);
  renderTable(dsnv);
  luuDataLocal();
}

function suaNV(Stt) {
  console.log(Stt);
  var index = timKiemNV(Stt);
  var nv = dsnv[index];

  document.getElementById("txtStt").value = nv.ma;
  document.getElementById("txtTenNV").value = nv.ten;
  document.getElementById("txtEmail").value = nv.email;
  document.getElementById("txtPhone").value = nv.phone;
}

function capNhatNV() {
  console.log("yes");
  var ma = document.getElementById("txtStt").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var phone = document.getElementById("txtPhone").value;

  var nhanVien = new NhanVien(ma,ten,email,phone);
  var index = timKiemNV(ma);
  dsnv[index] = nhanVien;
  renderTable(dsnv);

  document.getElementById("formQLNV").reset();
}
function renderTable(array) {
  var contentHTML = "";
  for (var index = 0; index < array.length; index++) {
    var nv = array[index];
    contentHTML += `
    <tr>
         <td>${nv.ma}</td>
         <td>${nv.ten}</td>
         <td>${nv.email}</td>
         <td>${nv.phone}</td>
         <td>
         <button class="btn btn-success" onclick="suaNV(${nv.ma})">Sửa</button>
         <button class="btn btn-danger"  onclick="xoaNV(${nv.ma})">Xoá</button>
         </td>
    </tr>`;
  }
  document.getElementById("tbodyNhanVien").innerHTML = contentHTML;
  //   console.log(contentHTML);
}
