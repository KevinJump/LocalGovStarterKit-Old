<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="jumooNavMaker.ascx.cs" Inherits="jumoo.NavMaker.jumooNavMaker" %>
<script type="text/javascript">
    $(document.forms[0]).submit(function () {
        document.getElementById("navprogress").innerHTML
            = "Importing Stuff... <small>can take a little while</small>";
        $('.navparser_btn').hide();
    });
</script>

<h2>Starter Kit Installed</h2>
<p>
    The Localgov Starter kit has been installed, go over to the settings and content nodes to have a look around.
</p>
<h3>Add Navigation</h3>
<p>
    by default the starter kit hasn't put in any standard navigation, from here you can add some standard navigation elements -
    you might not want to do this if you are wanting to build your own navigation into the starter kit.
</p>
<p>
    Importing the Navigation will take a while and it will build the main structure but not the individual service pages 
    (you don't want them <strong>all!</strong>)
</p>
<p>
<asp:Button ID="btnLGNL" runat="server" OnClick="Button1_Click" Text="Import Local Goverment Navigation List" CssClass="btn btn-primary btn-large navparser_btn" Enabled="false"/>
<asp:Button ID="btnSGNL" runat="server" Text="Import Scotish Website Navigation List " CssClass="btn btn-warning btn-large navparser_btn" OnClick="btnSGNL_Click" Enabled="false"/>
</p>
<p>
    <h3 id="navprogress"><asp:Label ID="navstatus" runat="server" Text=""></asp:Label></h3>
</p>
<hr />
<small> Contains public sector information from the <a href="http://standards.esd.org.uk/">esd-toolkit programme</a> licensed under the Open Government Licence v2.0. </small>