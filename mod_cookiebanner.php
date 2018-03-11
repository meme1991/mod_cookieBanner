<?php
# @Author: SPEDI srl
# @Date:   03-01-2018
# @Email:  sviluppo@spedi.it
# @Last modified by:   SPEDI srl
# @Last modified time: 11-03-2018
# @License: GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
# @Copyright: Copyright (C) SPEDI srl

defined('_JEXEC') or die;

/* params */
$jquery           = $params->get('jquery');
$message          = htmlentities($params->get('message'));
$primary          = $params->get('primary');
$secondary        = $params->get('secondary');
$btnDecline       = ($params->get('btnDecline')) ? 'true' : 'false';
$expire_days      = $params->get('expireDays');
$privacy_link     = JFactory::getApplication()->getMenu()->getItem($params->get('btnPrivacy-link'));
$privacy_link     = JRoute::_($privacy_link->link);

/* position */
$position     = $params->get('position');
$fixed        = ($params->get('fixed')) ? 'true' : 'false';
$buttonInline = $params->get('button-inline');

$document = JFactory::getDocument();
if($jquery)
  JHtml::_('jquery.framework');
$document->addStyleSheet(JUri::base(true).'/modules/'.$module->module.'/css/jquery.cookiebar.min.css?v=1.0.0');
$document->addScript(JUri::base(true).'/modules/'.$module->module.'/js/jquery.cookiebar.min.js?v=1.1.0', 'text/javascript', true, false);
$style  = "/* SPEDI COOKIE ACCEPT CUSTOM STYLE */ \n";
$style .= " #cookie-bar{background:".$primary."!important;} \n";
$style .= " #cookie-bar > p{color:".$secondary."!important} \n";
$style .= " #cookie-bar .cb-enable {background:".$secondary."!important; color: ".$primary." !important;} \n";
$style .= " #cookie-bar .cb-disable {border-color:".$secondary."!important; color: ".$secondary." !important;} \n";
$style .= " #cookie-bar .cb-policy {text-decoration: underline; color:".$secondary."!important;} \n";
if($buttonInline){
  $style .= " #cookie-bar div{margin-left:10px;} \n";
  $style .= " #cookie-bar div, #cookie-bar p {display: inline;} \n";
  $style .= " #cookie-bar .btn {padding: 0 5px;} \n";
}

$document->addStyleDeclaration($style);

$script = "
  jQuery(document).ready(function($){
    $.cookieBar({
      message: \"".$message."\",
      acceptButton: true,
      acceptText: '".JText::_("MOD_COOKIEBANNER_ACCEPT")."',
      declineButton: ".$btnDecline.",
      declineText: '".JText::_("MOD_COOKIEBANNER_DECLINE")."',
      policyButton: true,
      policyText: '".JText::_("MOD_COOKIEBANNER_PRIVACY_LINK")."',
      policyURL: '".$privacy_link."',
      autoEnable: true,
      acceptOnContinue: false,
      acceptOnScroll: false,
      acceptAnyClick: false,
      expireDays: ".$expire_days.",
      forceShow: false,
      effect: 'slide',
      fixed: ".$fixed.",
      bottom: ".$position.",
      zindex: '999999999',
      domain: '".$_SERVER['HTTP_HOST']."',
      referrer: '".$_SERVER['HTTP_HOST']."'
    });
  });
";
$document->addScriptDeclaration($script);
