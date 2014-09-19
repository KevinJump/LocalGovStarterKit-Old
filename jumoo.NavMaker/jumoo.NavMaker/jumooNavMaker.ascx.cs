using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;

namespace jumoo.NavMaker
{
    public static class NavPaths
    {
        public static string lgnl = "~/app_data/temp/lgNav/englishAndWelshServices.xml";
        public static string sgnl = "~/app_data/temp/lgNav/scottishServices.xml";
        public static string examples = "~/app_data/temp/lgNav/examples.xml";
    }
    /// <summary>
    ///  looks in the /app_data/nav folder of an umbraco install and attempts to build
    ///  navigation based on the files - mainly for importing LGNL structures into a starterkit
    /// </summary>
    public partial class jumooNavMaker : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (File.Exists(Request.MapPath(NavPaths.lgnl)))
                    btnLGNL.Enabled = true;

                if (File.Exists(Request.MapPath(NavPaths.sgnl)))
                    btnSGNL.Enabled = true;

                if (File.Exists(Request.MapPath(NavPaths.examples)))
                    btnExample.Enabled = true;
            }

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string filename = NavPaths.lgnl;
            LoadNav(filename);

            btnSGNL.Enabled = false;
            btnLGNL.Enabled = false;
        }

        protected void btnSGNL_Click(object sender, EventArgs e)
        {
            // do the scottish nav...
            string filename = NavPaths.sgnl;
            LoadNav(filename);
            btnSGNL.Enabled = false;
            btnLGNL.Enabled = false;
        }

        protected void LoadNav(string filename)
        {
            // import the LGNL from /nav/lgnl.xml
            if (File.Exists(Request.MapPath(filename)))
            {
                // do the import...
                EsdNavParser parser = new EsdNavParser();
                parser.Load(Request.MapPath(filename));
                parser.ParseNav(false);

                navstatus.Text =
                    string.Format("Import Completed... {0} Page Created <em>{1}</em>", parser.NodeCount, parser.LastError);
            }

        }

        protected void btnExample_Click(object sender, EventArgs e)
        {
            BasicNavParser basicImport = new BasicNavParser();
            int count = basicImport.ImportNavigation(NavPaths.examples);

            navstatus.Text =
                string.Format("Import Completed... {0} pages created", count);

            // basicImport.MakeExampleContent(1073, NavPaths.examples);
        }
    }
}