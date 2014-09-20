<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LocalGovKit.ascx.cs" Inherits="jumoo.NavMaker.LocalGovKit" %>
<script type="text/javascript">
    $(document.forms[0]).submit(function () {
        document.getElementById("navprogress").innerHTML
            = "Importing Stuff... <small>can take a little while</small><div class='umb-loader'></div>";
        $('.btnNav').hide();
    });
</script>
<style>
    .btnNav { min-width: 310px; }
    .padded-btn { margin-bottom: 0.7em; }
</style>
<div class="row">
    <div class="span12">
        <h3><i class="icon-check large"></i> Localgov Starter Kit</h3>
        <strong>Thank you for installing the local gov starter kit.</strong>
        <p>
            The localgov starterkit has been produced to give you an idea as to
            how you might build a localgov website with umbraco.
        </p>
    </div>
</div>
<div class="row">
    <div class="span6">
        <h3><i class="icon-book"></i> Documentation</h3>
        <p>
            There is documentation in the example content and all the scripts are
            templates are commented througout. We are also starting to build our
            documentation over on <a href="https://github.com/KevinJump/LocalGovStarterKit">github</a> so you should go take a look and see if 
            you can help.
        </p>
    </div>
    <div class="span6">
        <h3><i class="icon-page-add"></i> Example Content</h3>
        <p>
            The example content lets you see how the content works inside the 
            starterkit, you might not want the example content. but if you do 
            you can install it below.
        </p>
        <asp:Button ID="btnExampleContent" runat="server" Text="Install Example Content" CssClass="btn btn-inverse btn-large" OnClick="btnExampleContent_Click" Visible="false"/>
    </div>
</div>
<div class="row">
    <div class="span12">
        <h3><i class="icon-sitemap"></i> Navigation</h3>
        <p>
            The localgov kit comes will all the document types, templates and 
            scripts you need to start building your own site, but out of the box
            it has no navigation. but don't worry - we've provided some
            structures to get you started
        </p>
     </div>
</div>
<div class="row">
    <div class="span6">
        <ul class="unstyled">
            <li class="padded-btn"><asp:Button ID="btnNavLGNL" runat="server" Text="Local Government Navigation" CssClass="btn btn-info btn-large btnNav" OnClick="btnNavLGNL_Click" Visible="false"/></li>
            <li class="padded-btn"><asp:Button ID="btnNavSGNL" runat="server" Text="Scottish Government Navigation" CssClass="btn btn-info btn-large btnNav" OnClick="btnNavSGNL_Click" Visible="false"/></li>
        </ul>
    </div>
    <div class="span6">
        <ul class="unstyled">
            <li class="padded-btn"><asp:Button ID="btnNavLiv" runat="server" Text="Liverpool Model Navigation" CssClass="btn btn-info btn-large btnNav" Visible="false"/></li>
            <li class="padded-btn"><asp:Button ID="btnNavEdin" runat="server" Text="Edinburgh Model Navigation" CssClass="btn btn-info btn-large btnNav" Visible="false"/></li>
        </ul>
    </div>
</div>
<div class="row">
    <div class="span12">
        <h3 id="navprogress">
            <asp:Label ID="navstatus" runat="server" Text=""></asp:Label>
        </h3>
    </div>
</div>
<div class="row">
    <div class="span12">

    </div>
</div>