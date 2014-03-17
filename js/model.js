var APP = APP || {}

APP.cameraCategories = [
	{
		name: "Digital SLR Camera",
		title: "DSLR",
		best_seller_list: "http://www.amazon.com/Best-Sellers-Electronics-Digital-SLR-Cameras/zgbs/electronics/3017941/ref=zg_bs_nav_e_3_281052"
	},
];

APP.cameraCategoriesType = [
	{
		name: "DSLR",
		title: "Digital SLR"
	},
	{
		name: "Compack",
		title: "Compack System"
	}
];

APP.cameraCategoriesManufacturer = [
	{
		name: "Canon"
	},
	{
		name: "Fujifilm"
	},
	{
		name: "Nikno"
	},
	{
		name: "Olympus"
	},
	{
		name: "PENTAX"
	},
	{
		name: "Sony"
	},
	{
		name: "Samsung"
	},
];


APP.cameraListDSLR = [
	{
		name: "Canon T3i",
		title: "Canon EOS Rebel T3i",
		key: "T3i",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://dpinterface.com/reviews/canon-eos-t3i/canon-t3i-intro.jpg",
		amazonUrl: "http://www.amazon.com/Canon-T3i-Digital-Imaging-18-55mm/dp/B004J3V90Y/ref=zg_bs_3017941_1",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120508",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-rebel-t3i-dslr-camera-body-only/2129187.p?id=1218312457503&skuId=2129187&st=Canon%20-%20EOS%20Rebel%20T3i%20DSLR&cp=1&lp=3"
	},
	// {
	// 	name: "Canon T3",
	// 	title: "Canon EOS Rebel T3",
	// 	key: "T3",
	// 	manufacturer: "Canon",
	// 	type: "DSLR",
	// 	img: "http://www.techgadgets.in/img/canon-rebel-t3i-t3.jpg",
	// 	amazonUrl: "http://www.amazon.com/Canon-Rebel-T3-Digital-18-55mm/dp/B004J3Y9U6/ref=zg_bs_3017941_2",
	// 	neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120506",
	// 	bestbuyUrl: "http://www.bestbuy.com/site/eos-rebel-t3-dslr-camera-w-18-55mm-ef-s-is-type-ii-lens/1987075.p?id=1218304513854&skuId=1987075&st=canon%20t3&cp=1&lp=1"
	// },
	{
		name: "Canon 6D",
		title: "Canon EOS 6D",
		key: "6D",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://www.dpreview.com/reviews/canon-eos-6d/images/frontpage.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Digital-Camera-3-0-Inch-EF24-105mm/dp/B009B0MZG2/ref=zg_bs_3017941_3",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120658",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-6d-digital-slr-camera-body-only/6776221.p?id=1218807854681&skuId=6776221&st=canon%206D&cp=1&lp=1"
	},
	{
		name: "Canon 70D",
		tilte: "Canon EOS 70D",
		key: "70D",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://www.ephotozine.com/articles/canon-eos-70d-dslr-22291/images/highres-canon-EOS-70D-FRT-VARI-ANGLE-MONITOR-OPEN-w-EF-S-18-135mm-IS-STM_1372751125.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Digital-Camera-18-135mm-F3-5-5-6/dp/B00DMS0LCO/ref=zg_bs_3017941_4",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120695",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-70d-digital-slr-camera-body-only-black/8896099.p?id=1218941181333&skuId=8896099&st=Canon%20EOS%2070D&cp=1&lp=2"
	},
	{
		name: "Canon SL1",
		title: "Canon EOS Rebel SL1",
		key: "SL1",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://cdn.ndtv.com/tech/images/gadgets/canon-eos-rebel-sl1-635.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Rebel-18-0-Digital-18-55mm/dp/B00BW6LY2Y/ref=zg_bs_3017941_8",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120680",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-rebel-sl1-dslr-camera-body-only/8437083.p?id=1218875430022&skuId=8437083&st=Canon%20SL1&cp=1&lp=2",
	},
	{
		name: "Canon T5i",
		title: "Canon EOS Rebel T5i",
		key: "T5i",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://www.bobatkins.com/photography/digital/rebel_t5i/eos_rebel_t5i.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Rebel-Digital-Camera-18-55mm/dp/B00BW6LWO4/ref=zg_bs_3017941_9",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120677",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-rebel-t5i-18-0-megapixel-dslr-camera-body-only/8437056.p?id=1218875433176&skuId=8437056&st=Canon%20Rebel%20T5&cp=1&lp=1"
	},	
	{
		name: "Nikon D7100",
		title: "Nikon D7100",
		key: "D7100",
		manufacturer: "Nikon",
		type: "DSLR",
		img: "http://img.gawkerassets.com/img/18f9fgc2506dnjpg/original.jpg",
		amazonUrl: "http://www.amazon.com/Nikon-D7100-24-1-DX-Format-Digital/dp/B00BI9X7UC/ref=zg_bs_3017941_10",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA2GA0V86742",
		bestbuyUrl: "http://www.bestbuy.com/site/d7100-dslr-camera-body-only/8155054.p?id=1218865165971&skuId=8155054&st=Nikon%20D7100&cp=1&lp=2"
	},
	{
		name: "Canon 60D",
		title: "Canon EOS 60D",
		key: "60D",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://www.sowl.com/wp-content/uploads/2010/12/canon-eos-60d-e2.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Digital-3-0-Inch-18-135mm-Standard/dp/B0040JHVC2/ref=zg_bs_3017941_11",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120458",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-60d-dslr-camera-body-only/1222177.p?id=1218237704342&skuId=1222177&st=canon%2060d&cp=1&lp=3"
	},
	// {
	// 	name: "Nikon D7000",
	// 	title: "Nikon D7000",
	// 	key: "D7000",
	// 	manufacturer: "Nikon",
	// 	type: "DSLR",
	// 	img: "http://www.kenrockwell.com/nikon/d7000/D3S_2871-1200.jpg",
	// 	amazonUrl: "http://www.amazon.com/Nikon-D7000-Digital-Body-MODEL/dp/B0042X9LC4/ref=zg_bs_3017941_13",
	// 	neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1K50PV5525",
	// 	bestbuyUrl: "http://www.bestbuy.com/site/refurbished-d7000-16-2mp-1080-hd-digital-slr-camera-body-25468/1308031963.p?id=mp1308031963&skuId=1308031963&st=nikon%20d7000&cp=1&lp=3#tab=buyingOptions"
	// },
	{
		name: "Nikon D5300",
		title: "Nikon D5300",
		key: "D5300",
		manufacturer: "Nikon",
		type: "DSLR",
		img: "http://nikonrumors.com/wp-content/uploads/2013/10/Nikon-D5300-DSLR-camera.jpg",
		amazonUrl: "http://www.amazon.com/Nikon-Digital-Camera-18-140mm-3-5-5-6G/dp/B00FY3T3TM/ref=zg_bs_3017941_14",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830113550",
		bestbuyUrl: "http://www.bestbuy.com/site/d5300-digital-slr-camera-body-only/2636753.p?id=1219075350183&skuId=2636753&st=Nikon%20D5300&cp=1&lp=2"
	},
	{
		name: "Canon 5D III",
		title: "Canon EOS 5D Mark III",
		key: "5D",
		manufacturer: "Canon",
		type: "DSLR",
		img: "http://www.cinema5d.com/wp-content/uploads/2013/05/original.jpg",
		amazonUrl: "http://www.amazon.com/Canon-Frame-Full-HD-Digital-Camera/dp/B007FGYZFI/ref=zg_bs_3017941_16",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830120615",
		bestbuyUrl: "http://www.bestbuy.com/site/eos-5d-mark-iii-dslr-camera-body-only/4839357.p?id=1218541224336&skuId=4839357&st=Canon%20EOS%205D%20Mark%20III&cp=1&lp=1#tab=overview"
	},
	// {
	// 	name: "Sony A3000",
	// 	title: "Sony Alpha 3000",
	// 	key: "a3000",
	// 	manufacturer: "Sony",
	// 	type: "DSLR",
	// 	img: "http://img1.digitalversus.com/produits/16/17067/sony-alpha-3000_1377508790.jpg".
	// 	amazonUrl: "http://www.amazon.com/Sony-Interchangeable-Digital-20-1MP-18-55mm/dp/B00EH5UGR6/ref=zg_bs_3017941_17",
	// 	neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830179689",
	// 	bestbuyUrl: "http://www.bestbuy.com/site/alpha-a3000-compact-system-camera-with-18-55mm-lens/1579271.p?id=1219056203929&skuId=1579271&st=Sony%20A3000&cp=1&lp=1"
	// },
	{
		name: "Nikon D3300",
		title: "Nikon D3300",
		key: "D3300",
		manufacturer: "Nikon",
		type: "DSLR",
		img: "http://img1.digitalversus.com/produits/16/17067/sony-alpha-3000_1377508790.jpg",
		amazonUrl: "http://www.amazon.com/Nikon-Digital-NIKKOR-18-55mm-3-5-5-6G/dp/B00HQ4W1QE/ref=zg_bs_3017941_20",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1J21BW9461",
		bestbuyUrl: "http://www.bestbuy.com/site/d3300-dslr-camera-with-af-s-dx-nikkor-18-55mm-f-3-5-5-6g-vr-ii-lens/3394038.p?id=1219091220519&skuId=3394038&st=Nikon%20D3300&cp=1&lp=1"
	},
	{
		name: "Nikon D5200",
		title: "Nikon D5200",
		key: "D5200",
		manufacturer: "Nikon",
		type: "DSLR",
		img: "http://nikonrumors.com/wp-content/uploads/2012/11/Nikon-D5200-DSLR-camera.jpg",
		amazonUrl: "http://www.amazon.com/Nikon-Digital-18-55mm-3-5-5-6-NIKKOR/dp/B00AXTQR5U/ref=zg_bs_3017941_23",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1J20MZ1278",
		bestbuyUrl: "http://www.bestbuy.com/site/d5200-dslr-camera-body-only/7525209.p?id=1218851197979&skuId=7525209&st=nikon%20d5200&cp=1&lp=1"
	},
	{
		name: "Nikon D610",
		title: "Nikon D610",
		key: "D610",
		manufacturer: "Nikon",
		type: "DSLR",
		img: "http://media.digitalcameraworld.com/files/2013/10/nikon_d610_169-578-80.jpeg",
		amazonUrl: "http://www.amazon.com/Nikon-D610-FX-Format-Digital-Camera/dp/B00FOTF8M2/ref=zg_bs_3017941_24",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1J214X7439",
		bestbuyUrl: "http://www.bestbuy.com/site/d610-dslr-camera-body-only/2061108.p?id=1219068640211&skuId=2061108&st=Nikon%20D610%20&cp=1&lp=1"
	}
];

APP.cameraListCompack = [
	{
		name: "Sony NEX-3NL/B",
		title: "Sony NEX-3NL/B",
		key: "NEX-3NL",
		manufacturer: "Sony",
		type: "Compack",
		img: "http://ecx.images-amazon.com/images/I/81YOfyxeH-L._SL1500_.jpg",
		amazonUrl: "http://www.amazon.com/Sony-NEX-3NL-Compact-Interchangeable-Digital/dp/B00BF9MUBM/ref=zg_bs_3109924011_1",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA2001BV3462",
		bestbuyUrl: "http://www.bestbuy.com/site/nex-3nl-16-1-megapixel-digital-compact-system-camera-with-selp1650-16-50mm-zoom-lens/8157043.p?id=1218865165964&skuId=8157043&st=Sony%20NEX-3NL/B&cp=1&lp=1"
	},
	{
		name: "Fujifilm X-T1",
		title: "Fujifilm X-T1",
		key: "X-T1",
		manufacturer: "Fujifilm",
		type: "Compack",
		img: "http://www.ephotozine.com/articles/fujifilm-x-t1-hands-on-review-23896/images/highres-Fujifilm-X-T1-18-55m-Kit-Lens-2_1390819461.jpg",
		amazonUrl: "http://www.amazon.com/Fujifilm-X-T1-18-55mm-F2-8-4-0-Lens/dp/B00HYAL84G/ref=zg_bs_3109924011_2",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830122557",
		bestbuyUrl: "http://www.bestbuy.com/site/x-t1-digital-compact-system-camera-body-only/4120191.p?id=1219096316802&skuId=4120191&st=Fujifilm%20X-T1&cp=1&lp=1"
	},
	{
		name: "Samsung NX1100",
		title: "Samsung NX1100",
		key: "NX1100",
		manufacturer: "Samsung",
		type: "Compack",
		img: " http://www.samsung.com/uk/consumer/flagship/EV-NX1100BFWGB_new/assets/nx1100_pr_white.png",
		amazonUrl: "http://www.amazon.com/Samsung-NX1100-Digital-Camera-20-50mm/dp/B00CEH9NFU/ref=zg_bs_3109924011_3",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1Y31959308",
		bestbuyUrl: "http://www.bestbuy.com/site/20-3-megapixel-mirrorless-camera-body-with-lens-kit-20-mm-50-mm-lens-white/1307337370.p?id=mp1307337370&skuId=1307337370&st=Samsung%20NX1100&cp=1&lp=2#tab=specifications"
	},
	{
		name: "Sony NEX-6/B",
		title: "Sony NEX-6/B",
		key: "NEX-6",
		manufacturer: "Sony",
		type: "Compack",
		img: "http://3.bp.blogspot.com/-Pro3HPPk1Ic/UORv1_YfQFI/AAAAAAAAGmQ/ToxK5wstv6E/s1600/sony_nex-6_front.jpg",
		amazonUrl: "http://www.amazon.com/Sony-Compact-Interchangeable-Digital-16-50mm/dp/B0096W1OKS/ref=zg_bs_3109924011_6",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1Y31958543",
		bestbuyUrl: "http://www.bestbuy.com/site/sony-alpha-nex-6l-16-1mp-camera-with-e-pz-16-50mm-oss-lens-55-210mm-lens/9999218700050007.p?id=pcmprd217600050007&skuId=9999218700050007&st=Sony%20NEX-6L&lp=1&cp=1"
	},
	{
		name: "Olympus E-PM2",
		title: "Olympus E-PM2",
		key: "E-PM2",
		manufacturer: "Olympus",
		type: "Compack",
		img: "http://m43blog.com/wp-content/uploads/2012/11/olympus_e-pm2_052.jpg",
		amazonUrl: "http://www.amazon.com/Olympus-Compact-System-14-42mm-40-150mm/dp/B00G237L8I/ref=zg_bs_3109924011_7",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1J21425081",
		bestbuyUrl: "http://www.bestbuy.com/site/pen-e-pm2-compact-system-camera-with-14-42mm-lens/6952978.p?id=1218816358890&skuId=6952978&st=Olympus%20E-PM2&cp=1&lp=1"
	},
	{
		name: "Sony a7",
		title: "Sony a7",
		key: "a7",
		manufacturer: "Sony",
		type: "Compack",
		img: "http://www.dailycameranews.com/wp-content/uploads/2013/10/xsony-a7-28-70-lens-image.jpg.pagespeed.ic.MDHK7HaYZ3.jpg",
		amazonUrl: "http://www.amazon.com/Sony-Full-Frame-Interchangeable-Digital-Camera/dp/B00FRDUZXM/ref=zg_bs_3109924011_10",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=9SIA1K51BF0940",
		bestbuyUrl: "http://www.bestbuy.com/site/alpha-a7-compact-system-camera-body-only/2672642.p?id=1219075353064&skuId=2672642&st=Sony%20a7&cp=1&lp=1"
	},
	{
		name: "PENTAX Q",
		title: "PENTAX Q",
		key: "Q",
		manufacturer: "PENTAX",
		type: "Compack",
		img: "http://www.ricoh-imaging.eu/media/b92a58a274350dff48891261dbdbc050/Q_a_white.jpg",
		amazonUrl: "http://www.amazon.com/Pentax-Black-Standard-Zoom-Lens/dp/B007SQB896/ref=zg_bs_3109924011_12",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830184177&Tpk=Pentax%20Q",
		bestbuyUrl: "http://www.bestbuy.com/site/q-12-4-megapixel-digital-compact-system-camera-with-zoom-lens-black/1306693224.p?id=mp1306693224&skuId=1306693224&st=Pentax%20Q%20Black&cp=1&lp=1#tab=buyingOptions"
	},
	{
		name: "Olympus OM-D E-M1",
		title: "Olympus OM-D E-M1",
		key: "E-M1",
		manufacturer: "Olympus",
		type: "Compack",
		img: "http://www.dpreview.com/reviews/olympus-om-d-e-m1/images/intro.jpg",
		amazonUrl: "http://www.amazon.com/Olympus-Compact-System-Camera-3-Inch/dp/B00EQ07PG2/ref=zg_bs_3109924011_13",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830111604",
		bestbuyUrl: "http://www.bestbuy.com/site/om-d-e-m1-compact-system-camera-body-only/1746148.p?id=1219062437119&skuId=1746148&st=Olympus%20OM-D%20E-M1&cp=1&lp=1"
	},
	{
		name: "Fujifilm X-E2",
		title: "Fujifilm X-E2",
		key: "X-E2",
		manufacturer: "Fujifilm",
		type: "Compack",
		img: "http://www.dpreview.com/reviews/fujifilm-x-e2/images/frontpage.jpg",
		amazonUrl: "http://www.amazon.com/Fujifilm-X-E2-Compact-Digital-3-0-Inch/dp/B00FPKDSGS/ref=zg_bs_3109924011_15",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830122536",
		bestbuyUrl: "http://www.bestbuy.com/site/x-e2-compact-system-camera-body-only/2686399.p?id=1219076369729&skuId=2686399&st=Fujifilm%20X-E2&cp=1&lp=1"
	},
	{
		name: "Fujifilm X-A1",
		title: "Fujifilm X-A1",
		key: "X-A1",
		manufacturer: "Fujifilm",
		type: "Compack",
		img: "http://kenrockwell.com/fuji/x-a1/1200.jpg",
		amazonUrl: "http://www.amazon.com/Fujifilm-X-A1-16-50mm-Lens-Black/dp/B00EYTM3FS/ref=zg_bs_3109924011_16",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830122518",
		bestbuyUrl: "http://www.bestbuy.com/site/x-a1-compact-system-camera-with-16-50mm-lens/2148516.p?id=1219069799470&skuId=2148516&st=Fujifilm%20X-A1&cp=1&lp=1#tab=overview"
	},
	{
		name: "Fujifilm X-M1",
		title: "Fujifilm X-M1",
		key: "X-M1",
		manufacturer: "Fujifilm",
		type: "Compack",
		img: "http://www.dpreview.com/reviews/fujifilm-x-m1/images/xm1-colours.jpg",
		amazonUrl: "http://www.amazon.com/Fujifilm-X-M1-Kit-16-50mm-Silver/dp/B00DCM0E5Y/ref=zg_bs_3109924011_17",
		neweggUrl: "http://www.newegg.com/Product/Product.aspx?Item=N82E16830122515",
		bestbuyUrl: "http://www.bestbuy.com/site/x-m1-compact-system-camera-body-only/1256922.p?id=1219047434151&skuId=1256922&st=Fujifilm%20X-M1&cp=1&lp=2"
	}
];











