'use strict';

// 기본 프로필 설정
const defaultProfile = {
  id: '인스타 아이디',
  name: '이름',
  url: 'www.naver.com',
  info: '프로필 설명',
  image: '<i class="bi bi-person-circle"></i>',
};

// DOM 요소 선택
const profileInfo = 'profileData';
const saveBtn = document.querySelector('#profile-save-btn');
const closeBtn = document.querySelector('#profile-close-btn');
const profileEditBtn = document.querySelector('#profile-edit-btn');
const storyBtn = document.querySelector('#story-btn');
const modalBg = document.querySelector('#modal-bg');
const makeArticleBtn = document.querySelector('#navbar__add-post');
const addPostModal = document.querySelector('.add-post-modal');
const addPostBg = document.querySelector('add-post-modal__background');

// 프로필 수정 입력 필드
const profileEditImage = document.querySelector('#profile-edit-image');
const profileEditId = document.querySelector('#update-profile-id');
const profileEditName = document.querySelector('#update-profile-name');
const profileEditUrl = document.querySelector('#update-profile-url');
const profileEditInfo = document.querySelector('#update-profile-info');

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
  profileEvents();
  updateProfileUI();
  updateArticleUi();
});

// 프로필 관련 이벤트 설정
function profileEvents() {
  // 모달 열기
  profileEditBtn.addEventListener('click', () => {
    modalBg.classList.remove('display-none');
  });

  // 배경 클릭시 모달 닫기
  modalBg.addEventListener('click', (e) => {
    if (e.target === modalBg) {
      modalBg.classList.add('display-none');
    }
  });

  // X 버튼 클릭시 모달 닫기
  closeBtn.addEventListener('click', () => {
    modalBg.classList.add('display-none');
  });

  // 이미지 업로드
  setupImageUpload();

  // 저장 버튼 클릭 이벤트
  setupSaveButton();
}
// 게시글 관련 이벤트 설정
function updateArticleUi() {
  //모달 열기
  makeArticleBtn.addEventListener('click', () => {
    addPostModal.classList.remove('display-none');
  });

  //배경 클릭시 모달 닫기
  addPostBg.addEventListener('click', (e) => {
    if (e.target === addPostBg) {
      addPostModal.close();
    }
  });
  // 버튼 클릭시 모달 닫기

  //이미지 업로드

  //창 바뀜

  //공유하기

  //돌아가기
}

// 이미지 업로드 기능 설정
function setupImageUpload() {
  const imageInput = document.querySelector('#profile-image-input');
  const profileImage = document.querySelector('#profile-edit-image');
  const previewImage = document.querySelector('#preview-image');

  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.style.display = 'none';
        previewImage.style.display = 'block';
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// 저장 버튼 기능 설정
function setupSaveButton() {
  saveBtn.addEventListener('click', () => {
    // 현재 입력된 데이터 수집
    const profileData = {
      id: profileEditId.value,
      name: profileEditName.value,
      url: profileEditUrl.value,
      info: profileEditInfo.value,
      image:
        document.querySelector('#preview-image').src || defaultProfile.image,
    };

    // localStorage에 저장
    localStorage.setItem(profileInfo, JSON.stringify(profileData));

    // 모달 닫기
    modalBg.classList.add('display-none');

    // UI 업데이트
    updateProfileUI();
  });
}

// 프로필 UI 업데이트
function updateProfileUI() {
  // localStorage에서 데이터 불러오기
  const savedProfile =
    JSON.parse(localStorage.getItem(profileInfo)) || defaultProfile;

  // 모달창 input들의 value 설정
  profileEditId.value = savedProfile.id;
  profileEditName.value = savedProfile.name;
  profileEditUrl.value = savedProfile.url;
  profileEditInfo.value = savedProfile.info;

  // 메인 UI 업데이트
  document.querySelector('#profile-id').textContent = savedProfile.id;
  document.querySelector('#profile-name').textContent = savedProfile.name;
  document.querySelector('#profile-info').textContent = savedProfile.info;
  document.querySelector('#profile-url a').textContent = savedProfile.url;
  document.querySelector('#profile-url a').href = savedProfile.url;

  // 이미지 업데이트
  updateProfileImage(savedProfile);
}

// 프로필 이미지 업데이트
function updateProfileImage(savedProfile) {
  const profileEditImage = document.querySelector('#profile-edit-image');
  const previewImage = document.querySelector('#preview-image');
  const mainProfileIcon = document.querySelector('#profile-image i');
  const mainProfileImg = document.querySelector('#profile-image img');

  if (savedProfile.image !== '<i class="bi bi-person-circle"></i>') {
    // 실제 이미지 표시
    profileEditImage.style.display = 'none';
    previewImage.style.display = 'block';
    previewImage.src = savedProfile.image;
    mainProfileIcon.style.display = 'none';
    mainProfileImg.style.display = 'block';
    mainProfileImg.src = savedProfile.image;
  } else {
    // 기본 아이콘 표시
    profileEditImage.style.display = 'block';
    previewImage.style.display = 'none';
    mainProfileIcon.style.display = 'block';
    mainProfileImg.style.display = 'none';
  }
}
