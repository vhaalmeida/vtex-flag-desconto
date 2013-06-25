(function($){
	$.fn.vtexFlagDesconto = function(options) {

		var defaults = {
			"onProductPage":false,
			"onShelfPage":true,
			"shelfPageText":"% off",
			"productPageText":"% off",
			"limit":5
		};

		var settings = $.extend( {}, defaults, options );

		return this.each(function() {

			
			if(settings.onProductPage == true)
			{
				if($('body').hasClass('produto'))
				{
					var precode = parseFloat($('body').find('.skuListPrice').html().replace('R$','').replace(',','.').trim());
					var precopor = parseFloat($('body').find('.skuBestPrice').html().replace('R$','').replace(',','.').trim());
					var desconto = 0;
					if(precopor < precode)
					{
						if($('div.apresentacao').find('.flag-porcentagem-desconto').size() == 0)
						{
							desconto = parseInt(100-(100*precopor/precode));
							if(desconto >= setting.limit)
							{
								$('div.apresentacao').append('<span class="flag-porcentagem-desconto">'+desconto+''+settings.productPageText+'</span>')
							}
						}
					}
				}
			}
			if(settings.onShelfPage == true)
			{
				if(!($('body').hasClass('produto')))
				{
					$('.prateleira li:not(".helperComplement")').each(function(){
						var precode = parseFloat($(this).find('span.flag-preco-de').html().replace('R$','').replace(',','.').trim());
						var precopor = parseFloat($(this).find('span.flag-preco-por').html().replace('R$','').replace(',','.').trim());
						var desconto = 0;
						var el = $(this);
						if(precopor < precode)
						{
							if($(this).find('.flag-porcentagem-desconto').size() == 0)
							{
								desconto = parseInt(100-(100*precopor/precode));
								if(desconto >= settings.limit)
								{
									el.append('<span class="flag-porcentagem-desconto">'+desconto+''+settings.shelfPageText+'</span>')
								}
							}
						}
					})
				}
			}
				
		})

	}; 
})( jQuery );