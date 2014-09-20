<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="jumooNavMaker.ascx.cs" Inherits="jumoo.NavMaker.jumooNavMaker" %>
<script type="text/javascript">
    $(document.forms[0]).submit(function () {
        document.getElementById("navprogress").innerHTML
            = "Importing Stuff... <small>can take a little while</small>";
        $('.navparser_btn').hide();
    });
</script>
<style>
    .navparser_btn {
        margin-bottom: 1em;
        padding: 11px;
        width: 96% !important;
    }

    a { font-weight: 700;}
</style>

<div class="row">
    <div class="span12">
        <h3><i class="icon-check large"></i> Localgov Starter Kit Installed</h3>
        <p>
            The Localgov Starterkit Has been installed. but there are few more things you can do.
        </p>
        <p>
            The starter kit has been installed, but no content has been imported - if you just 
            want all the templates, doctypes and macros then you can dive right in and 
            start building you site. 
        </p>
        <p>
            If you still need some examples to get yourself going - install some of the content 
            below and you can see how the site could work for you.
        </p>
    </div>
</div>
<div class="row">
    <div class="span6">
        <h3><i class="icon-page-add large"></i> Add Example Content</h3>
        <p>
            The starterkit comes with all the templates, document types, scripts and
            macros installed. but no content.
        </p>
        <p>
            If you want to get an idea the content might look with the 
            starter kit install some example content here        

        </p>

        <ul class="unstyled">
            <li>
                <asp:Button ID="btnExample" runat="server" Text="Install the Example Content" CssClass="btn btn-inverse btn-large navparser_btn" Enabled="true" OnClick="btnExample_Click" />
                <asp:Button ID="btnExport" runat="server" Text="Make content for Package" CssClass="navparser_btn btn-danger" OnClick="btnExport_Click" />
            </li>
        </ul>
    </div>
    <div class="span6">
            <h3><i class="icon-sitemap large"></i> Add Navigation</h3>
        <p>
            Importing the Navigation will take a while and it will build the main structure but not the individual service pages 
            (you don't want them <strong>all!</strong>)
        </p>
        <ul class="unstyled">
            <li>
                <asp:Button ID="btnLGNL" runat="server" OnClick="Button1_Click" Text="Import Local Goverment Navigation List" CssClass="btn btn-info btn-large navparser_btn" Enabled="false"/>
            </li>
            <li>
                <asp:Button ID="btnSGNL" runat="server" Text="Import Scotish Website Navigation List " CssClass="btn btn-warning btn-large navparser_btn" OnClick="btnSGNL_Click" Enabled="false"/>
            </li>
        </ul>
        <small> Contains public sector information from the <a href="http://standards.esd.org.uk/">esd-toolkit programme</a> licensed under the Open Government Licence v2.0. </small>    
    </div>
</div>
<div class="row">
    <div class="span12">
       <h3 id="navprogress"><asp:Label ID="navstatus" runat="server" Text=""></asp:Label></h3>
    </div>
</div>

<div class="row">
    <div class="span12">
        <h3>Share the love</h3>
        <p>
            As you develop your site, and build all the great and wonderful addons to make it truely fantastic. why not
            consider contributing back to the LocalGovStarter Kit - all the source code is avalible on <a href="https://github.com/KevinJump/uLocalGov.StarterKit" target="_blank">GitHub</a>, and their is 
            more information over on <a href="http://blog.jumoo.co.uk" target="_blank">our blog</a>.
        </p>
    </div>
</div>

