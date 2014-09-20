using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;

namespace jumoo.NavMaker
{
    public partial class LocalGovKit : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ( !IsPostBack )
            {
                if (File.Exists(Request.MapPath(NavPaths.lgnl)))
                    btnNavLGNL.Visible = true;
                if (File.Exists(Request.MapPath(NavPaths.sgnl)))
                    btnNavSGNL.Visible = true;
                if (File.Exists(Request.MapPath(NavPaths.liv)))
                    btnNavLiv.Visible = true;
                if (File.Exists(Request.MapPath(NavPaths.edin)))
                    btnNavEdin.Visible = true;
                if (File.Exists(Request.MapPath(NavPaths.examples)))
                    btnExampleContent.Visible = true;
            }

        }

        protected void btnExampleContent_Click(object sender, EventArgs e)
        {
            BasicNavParser basicParser = new BasicNavParser();
            int importCount = basicParser.ImportNavigation(NavPaths.examples);

            navstatus.Text =
                string.Format("Import completed : {0} pages created", importCount);

        }

        protected void btnNavLGNL_Click(object sender, EventArgs e)
        {
            LoadESDNav(NavPaths.lgnl);
        }

        protected void btnNavSGNL_Click(object sender, EventArgs e)
        {
            LoadESDNav(NavPaths.sgnl);
        }

        protected void LoadESDNav(string navFile)
        {
            string filepath = Request.MapPath(navFile);

            if ( File.Exists(filepath) )
            {
                EsdNavParser parser = new EsdNavParser();
                parser.Load(filepath);
                parser.ParseNav(false);

                navstatus.Text = 
                    string.Format("Import completed : {0} pages created <em>{1}</em>", parser.NodeCount, parser.LastError);

            }
            else
            {
                navstatus.Text = "Import failed, we couldn't find the import file";
            }

        }
    }
}