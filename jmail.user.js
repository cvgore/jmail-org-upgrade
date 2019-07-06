// ==UserScript==
// @name         	jmail
// @namespace    	https://github.com/cvgore/jmail-ovh-upgrade
// @version      	0.1
// @description  	Add full mail copy
// @author      	cvgore
// @match       	http*://www.jmail.ovh/*
// @grant       	none
// @updateURL 		https://github.com/cvgore/jmail-ovh-upgrade/raw/master/jmail.user.js
// @downloadURL 	https://github.com/cvgore/jmail-ovh-upgrade/raw/master/jmail.user.js
// ==/UserScript==

(function() {
    'use strict';

    function fmtMail(value) {
    	value = typeof value === 'undefined' ? '' : value;

    	let query = new URLSearchParams(window.location.search);

    	return value + (query.has('at') ? query.get('at') : '@jmail.ovh');
    }

    let elMailBox = document.querySelector('#mailBox');
    let elFullMailBox = document.createElement('INPUT');
    let elFullMailBoxFormGroup = document.createElement('DIV');
    let elFullMailBoxInputGroup = document.createElement('DIV');
    let elCopyMailWrapper = document.createElement('SPAN');
    let elCopyMailBtn = document.createElement('BUTTON');

    elCopyMailWrapper.className = 'input-group-btn';
    elCopyMailBtn.className = 'btn btn-success';
    elCopyMailBtn.innerText = 'Copy';

    elCopyMailBtn.addEventListener('click', function() {
    	elFullMailBox.focus();
    	elFullMailBox.select();
    	document.execCommand('copy');
    	elFullMailBox.setSelectionRange(0,0);
    	elFullMailBox.blur();

		elCopyMailBtn.innerText = 'Copied';

    	setTimeout(function() {
    		elCopyMailBtn.innerText = 'Copy';
    	}, 1000);
    })

    elCopyMailWrapper.append(elCopyMailBtn);

    elFullMailBox.className = 'form-control';
    elFullMailBox.setAttribute('readonly', 'readonly');

    elFullMailBoxInputGroup.className = 'input-group';
    elFullMailBoxFormGroup.className = 'form-group';

    elFullMailBoxInputGroup.append(elFullMailBox);
    elFullMailBoxInputGroup.append(elCopyMailWrapper);

    elFullMailBoxFormGroup.append(elFullMailBoxInputGroup);

    document.querySelector('.panel-body').children[0].prepend(elFullMailBoxFormGroup);

    elMailBox.addEventListener('input', function(ev) {
        elFullMailBox.value = fmtMail(elMailBox.value);
    });

    document.querySelector('#mainForm a[href^="javascript:goFastMailBox"]').addEventListener('click', function(ev) {
      	elFullMailBox.value = fmtMail(ev.currentTarget.getAttribute('href').replace(/^javascript:goFastMailBox\('/, '').replace(/'\)$/, ''));
    });

    if (elMailBox.value) {
    	elFullMailBox.value = fmtMail(elMailBox.value);
    }
})();
