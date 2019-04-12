class sceneMaster {
	public static stage;//舞台
	public static modal;//弹窗
	public static littleModal;//二级弹窗
	public static scene;//主页面
	public static modalBg;//弹窗背景层
	public static littleBg;//小弹窗背景层
	public static stageHeight = 1334;//舞台高度
	public constructor() {
	}
	public static init(stage) {
		sceneMaster.stage = stage;
		sceneMaster.stageHeight = stage.stageHeight;
		let rect = new eui.Rect(stage.stageWidth, stage.stageHeight, 0x000000);
		rect.alpha = 0.7;
		sceneMaster.modalBg = rect;
		let rect_2 = new eui.Rect(stage.stageWidth, stage.stageHeight, 0x000000);
		rect_2.alpha = 0.7;
		sceneMaster.littleBg = rect_2;
	}
	public static changeScene(scene) {
		sceneMaster.scene && sceneMaster.scene.parent && sceneMaster.stage.removeChild(sceneMaster.scene);
		sceneMaster.stage.addChild(scene);
		sceneMaster.scene = scene;
		sceneMaster.modal = null;
		sceneMaster.littleModal = null;
	}
	public static openModal(modal, modalBg = true) {
		//页面上加弹窗
		if (sceneMaster.modal) {
			//已存在一个弹窗
			sceneMaster.scene.removeChild(sceneMaster.modal);
			sceneMaster.modal = null;
			sceneMaster.littleModal = null;
		}
		sceneMaster.modal = modal;
		if (modalBg) {
			sceneMaster.scene.addChild(sceneMaster.modalBg);
			modal.scaleX = 0, modal.scaleY = 0;
			sceneMaster.scene.addChild(modal);
			setTimeout(function () {
				modal.x = 375, modal.y = 300;
				modal.anchorOffsetX = modal.width / 2, modal.anchorOffsetY = modal.height / 2;
				egret.Tween.get(modal).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
			}, 50);
		} else {
			sceneMaster.scene.addChild(modal);
		}



	}
	public static closeModal() {
		//关闭弹窗
		if (sceneMaster.modal) {
			//存在一个弹窗
			egret.Tween.get(sceneMaster.modal).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backOut).call(() => {
				sceneMaster.scene.removeChild(sceneMaster.modal);
				sceneMaster.modalBg.parent && sceneMaster.scene.removeChild(sceneMaster.modalBg);
				sceneMaster.modal = null;
				sceneMaster.littleModal = null;
			})

		}
	}
	public static openLittleModal(littleModal, littleBg = true) {
		//在弹窗上打开小弹窗
		if (sceneMaster.littleModal) {
			//已存在一个小弹窗
			sceneMaster.modal.removeChild(sceneMaster.littleModal);
		}
		if (littleBg) {
			sceneMaster.modal.addChild(sceneMaster.littleBg);
		}
		sceneMaster.littleModal = littleModal;
		littleModal.scaleX = 0, littleModal.scaleY = 0;
		littleModal.x = 375, littleModal.y = 300;
		littleModal.anchorOffsetX = littleModal.width / 2, littleModal.anchorOffsetY = littleModal.height / 2;
		egret.Tween.get(littleModal).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
		sceneMaster.modal.addChild(littleModal);
	}
	public static closeLittleModal() {
		//关闭小弹窗
		if (sceneMaster.littleModal) {
			//存在一个小弹窗
			sceneMaster.modal.removeChild(sceneMaster.littleModal);
			sceneMaster.littleModal = null;
			sceneMaster.littleBg.parent && sceneMaster.modal.removeChild(sceneMaster.littleBg);
		}
	}

}