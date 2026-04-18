function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('SDN Bukur - Dashboard Digital')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ============================================
// FUNGSI UNTUK SINKRONISASI DRIVE (BACKEND)
// ============================================

// Fungsi untuk menyimpan CSV dari web ke Google Drive
function saveStudentDataToDrive(csvContent) {
  try {
    var fileName = "Data_Siswa_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    var file;
    
    if (files.hasNext()) {
      // Jika file sudah ada, timpa isi yang lama
      file = files.next();
      file.setContent(csvContent);
    } else {
      // Jika belum ada, buat file baru di direktori utama Drive
      file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
    }
    return "Data CSV berhasil diunggah dan disimpan ke Google Drive Anda secara permanen!";
  } catch (e) {
    throw new Error(e.toString());
  }
}

// Fungsi untuk mengambil isi CSV dari Google Drive saat web dimuat
function getStudentDataFromDrive() {
  try {
    var fileName = "Data_Siswa_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    
    if (files.hasNext()) {
      var file = files.next();
      // Mengembalikan teks mentah dari file CSV
      return file.getBlob().getDataAsString();
    } else {
      // Mengembalikan null jika belum pernah upload
      return null; 
    }
  } catch (e) {
    throw new Error(e.toString());
  }
}

// Fungsi opsional jika tombol tong sampah diklik
function deleteStudentDataFromDrive() {
  try {
    var fileName = "Data_Siswa_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    while (files.hasNext()) {
      files.next().setTrashed(true);
    }
    return "File terhapus.";
  } catch(e) {
    // Abaikan jika tidak ditemukan
  }
}

// ============================================
// FUNGSI UNTUK SINKRONISASI DATA GURU (BACKEND)
// ============================================

function saveTeacherDataToDrive(csvContent) {
  try {
    var fileName = "Data_Guru_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    var file;
    
    if (files.hasNext()) {
      file = files.next();
      file.setContent(csvContent);
    } else {
      file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
    }
    return "Data Guru CSV berhasil diunggah dan disimpan ke Google Drive Anda secara permanen!";
  } catch (e) {
    throw new Error(e.toString());
  }
}

function getTeacherDataFromDrive() {
  try {
    var fileName = "Data_Guru_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    
    if (files.hasNext()) {
      var file = files.next();
      return file.getBlob().getDataAsString();
    } else {
      return null; 
    }
  } catch (e) {
    throw new Error(e.toString());
  }
}

function deleteTeacherDataFromDrive() {
  try {
    var fileName = "Data_Guru_SDN_Bukur.csv";
    var files = DriveApp.getFilesByName(fileName);
    while (files.hasNext()) {
      files.next().setTrashed(true);
    }
    return "File Data Guru terhapus.";
  } catch(e) {}
}

