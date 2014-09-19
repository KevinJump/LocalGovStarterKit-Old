using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Xml;
using System.Xml.Linq;

using Umbraco.Core;
using Umbraco.Core.Logging;
using Umbraco.Core.Services;
using Umbraco.Core.Models;
using Umbraco.Core.IO;

using Jumoo.uSync.Core;

namespace jumoo.NavMaker
{
    public class BasicNavParser
    {
        uSyncEngine uSyncCore;
        int importCount = 0;

        public BasicNavParser()
        {
            uSyncCore = new uSyncEngine();
        }

        public int ImportNavigation(string filename)
        {
            string filepath = IOHelper.MapPath(filename);
            importCount = 0;

            if (!System.IO.File.Exists(filepath))
                return -1;

            var navigation = XElement.Load(filepath);

            if (navigation == null)
                return -1;

            //
            // Import structure 
            // 
            
            foreach(var node in navigation.Elements("ContentType"))
            {
                ImportContentNode(node, -1);
            }


            return importCount;
        }

        private void ImportContentNode(XElement node, int parentId)
        {
            var content = uSyncCore.Content.Import(node);

            if (content != null)
            {
                importCount++;

                if (node.Element("Children") != null)
                {
                    var children = node.Element("Children");

                    // get all the children...
                    foreach (var child in children.Elements("ContentType"))
                    {
                        ImportContentNode(child, content.Id);
                    }
                }
            }
        }


    }
}