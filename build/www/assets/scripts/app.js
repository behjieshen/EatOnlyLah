$(document).ready(function(){function a(){console.log("hello"),$(".bmr-form").css("display","none"),$(".bmr-results").css("display","block"),$(".spinner").css("display","block"),$(".bmr-results-content").css("display","none"),setTimeout(function(){$(".bmr-results-content").css("display","block"),$(".spinner").css("display","none")},2e3)}function b(a){var b=a.serializeArray(),c={};return $.map(b,function(a){c[a.name]=a.value}),c}(function(){$(".bmr-modal-trigger").click(function(){$(".bmr-modal").addClass("active")}),$(".bmr-modal-close").click(function(){$(".bmr-modal").removeClass("active")}),$(".bmr-modal").mouseup(function(a){var b=$(".bmr-modal");b.is(a.target)&&0===b.has(a.target).length&&$(".bmr-modal").removeClass("active")})})(),function(){$(".bmr-option-button").click(function(){$(this).siblings(".bmr-option-button").removeClass("active"),$(this).addClass("active");var a=$(this).children("span")[0].textContent.toLowerCase().replace(" ","-");$(this).siblings("select").children("option").removeAttr("selected"),$(`[value=${a}]`).attr("selected","true")})}(),$("form").submit(function(c){var d=Math.round;c.preventDefault();var e,f=b($(this));switch(e="male"==f.gender?66+13.75*f.weight+5*f.height-6.8*f.age:655+9.6*f.weight+1.8*f.height-4.7*f.age,f.activity){case"lightly-active":e*=1.1;break;case"moderately-active":e*=1.275;break;case"very-active":e*=1.35;break;case"extra-active":e*=1.525;break;default:}switch(f.goal){case"build-muscle":e+=200;break;case"lose-fat":e-=200;break;case"maintainence":e-=100;break;default:}var g=d(e);$(".bmr-results-content").children("h6").text(`${g} calories`),a(),$(".bmr-results-content span").click(function(){$("form")[0].reset(),$(".bmr-form").css("display","block"),$(".bmr-results").css("display","none"),$(".bmr-results-content").css("display","none")})})});