// declaração das variáveis
var paginaAtual = 0,
controlMenu = true,
page = "",
tlMenu,
pgnControl = 0,
isFirst = true;

// função que inicia os eventos
function init() {
	//var te = $("#navlist div").eq(1);
	$(document).on('click', '#navlist div', clickBtnMenu);
	$(document).on('mouseenter', '#navlist div', changeLabel);
	$(document).on('mouseleave', '#navlist div', changeLabel);
	$(document).on('click', '[data-linkOpen]', abrirLinkBlank);
	$(document).on('click', '#tabs li', trocarTab);
	$(document).on('click', '#logo', goHome);
}

// função que abre os links em uma nova aba do navegador
function abrirLinkBlank() {
	window.open($(this).attr("data-linkOpen"),"_blank");
}

/*
 *	função que troca os textos no menu principal
 *	Ex: Cursos Customizados, Mobile, Vídeos, Jogos e etc...
 */
function changeLabel(e) {
	if (e.type == "mouseenter") {
		changeLabelEffect($(this).attr("text"));
	} else {
		changeLabelEffect("Catálogo");
	}
}

// função que da o efeito para a troca de textos do menu principal
function changeLabelEffect(text) {
	TweenMax.to("#menu #label", 0, {opacity:0, marginLeft:"670px", ease:Bounce.easeOut});
	TweenMax.to("#menu #label", 0.4, {opacity:1, marginLeft:"705px", ease:Bounce.easeOut});
	$("#menu #label").html(text);
}

// função responsável por carregar a pagina que você escolheu no menu principal
function onCompleteAnimationMenu() {
	if (!isFirst) {
		tirarPagina();
	} else {
		pgnControl = paginaAtual;
		isFirst = false;
		carregaPagina();
	}
}

/*
 *	função que tira a pagina atual e faz a animação dos thumbs voltar
 *	Ex: da pagina cc.html para a videos.html
 */
function tirarPagina() {
 	if (paginaAtual != pgnControl) {
		tlThumbs.reverse();
		pgnControl = paginaAtual;
	 }
}

// função que carrega as páginas na div #pages
function carregaPagina() {
	$("#pages").empty();
	$("#pages").load("pages/"+page,function() {
		carregarThumbs();
		if (page == "ilustras.html") {
			$(".group1").colorbox({rel:"group1", maxHeight:"80%", maxWidth:"70%"});
			$(".group2").colorbox({inline:true, maxHeight:"80%", width:"69%"});
			$(".group3").colorbox({rel:"group3", maxHeight:"80%", maxWidth:"70%"});
		} else {
			$(".inline").colorbox({inline:true, width:"670px", height:"345px", maxHeight:"345px"});
		}
		$("#content #centerContent").show(0);
	});
}

// função que faz o filtro das categorias dos boxes gallery
function trocarTab() {
	var self = $(this);
	var cat = self.attr('cat');
	$("#tabs li").removeClass("sel");
	self.addClass("sel");
	var others = $("#thumbs div").not("[cat='"+cat+"']");
	self = $("#thumbs div[cat='"+cat+"']");

	if (cat != 0 || cat != "0") {
		TweenMax.staggerTo(others, 0.5, {scale:0, opacity:0, width:0, height:0, display:"none", ease:Expo.easeIn});
		TweenMax.staggerTo(self, 0.5, {scale:1, opacity:1, display:"block", width:230, height:250, ease:Expo.easeIn});
	} else {
		TweenMax.staggerTo("#thumbs div", 0.5, {scale:1, opacity:1, display:"block", width:230, height:250, ease:Expo.easeIn});
	}
}

/*
 *	Ao clicar no logo da Telefonica Educação Digital, da um refresh na página
 *	e volta para o menu principal
 */
function goHome() {
	window.location.reload();
}

// função que controla os cliques no menu principal
function clickBtnMenu() {
	var self = $(this);
	var widthContent = window.innerWidth - 120;
	var btns = $("#navlist div");
	paginaAtual = self.index();
	//console.log("num paginaAtual "+paginaAtual);
	page = self.data("page");
	//console.log("carregando a pagina '" + page + "' na div #pages");
	btns.removeClass("atual");
	self.addClass("atual");
	$("#menu #label").hide();

	if (controlMenu) {
		TweenMax.staggerTo(btns.find("img"), 0.5, {width:70, ease:Elastic.easeIn, onComplete:onCompleteStagger}, 0.01);
		tlMenu = new TimelineLite();
		tlMenu.pause();
		tlMenu.to("#logo img", 0.1, {width:'100px'});
		tlMenu.to("#logo", 0.01, {padding:"25px 0 0 7px", margin:0, height:'55px', width:'115px'});
		tlMenu.to(btns.eq(0), 1, {marginLeft:25, marginTop:100, ease:Elastic.easeOut});
		tlMenu.to(btns.eq(1), 1, {marginLeft:25, marginTop:170, ease:Elastic.easeOut}, - 0.2);
		tlMenu.to(btns.eq(2), 1, {marginLeft:25, marginTop:240, ease:Elastic.easeOut}, - 0.3);
		tlMenu.to(btns.eq(3), 1, {marginLeft:25, marginTop:310, ease:Elastic.easeOut}, - 0.4);
		tlMenu.to(btns.eq(4), 1, {marginLeft:25, marginTop:380, ease:Elastic.easeOut}, - 0.4);
		tlMenu.to(btns.eq(5), 1, {marginLeft:25, marginTop:450, ease:Elastic.easeOut}, - 0.5);
		tlMenu.to(btns.eq(6), 1, {marginLeft:25, marginTop:520, ease:Elastic.easeOut}, - 0.6);
		tlMenu.to("#menu", 1, {width:120, ease:Elastic.easeOut}, 0.7);
		tlMenu.to("#content", 1.5, {width:widthContent, ease:Elastic.easeOut, onComplete:onCompleteAnimationMenu}, 1);
		$("#imgFundo").addClass("blur");
		controlMenu = false;
	} else {
		onCompleteAnimationMenu();
	}
}

// função que carrega as imagens dos boxes gallery
function carregarThumbs() {
	$("[dataimgFundo]").each(function() {
		$(this).find("img").attr("src", "img/thumbs/"+$(this).attr("dataimgFundo"));
	});
}

function onCompleteStagger() {
	tlMenu.play();
}

// assim que a página for carregada completamente, inicia os eventos
window.onload = init;
