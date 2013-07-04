(function($){
	$.fn.vtexFlagDesconto = function(options) {

		var defaults = {
			"onProductPage":false,
			"onShelfPage":true,
			"shelfPageText":"% off",
			"productPageText":"% off",
			"limit":5
		};

		var treatPriceString = function(el){
			return parseFloat(el.html().replace('.','').replace('R$','').replace(',','.').trim());
		}

		var settings = $.extend( {}, defaults, options );

		return this.each(function() {

			
			if(settings.onProductPage == true)
			{
				if($('body').hasClass('produto'))
				{
					var precode = treatPriceString($('body').find('.skuListPrice'));
					var precopor = treatPriceString($('body').find('.skuBestPrice'));
					var desconto = 0;
					if(precopor < precode)
					{
						if($('div.apresentacao').find('.flag-porcentagem-desconto').size() == 0)
						{
							desconto = parseInt(100-(100*precopor/precode));
							if(desconto >= settings.limit)
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
						var precode = treatPriceString($(this).find('span.flag-preco-de'));
						var precopor = treatPriceString($(this).find('span.flag-preco-por'));
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