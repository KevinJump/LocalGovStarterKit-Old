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
            // Look and see if the root node already exists for the content we want to import...
            // 
            var _contentService = ApplicationContext.Current.Services.ContentService;
            var rootContent = _contentService.GetRootContent();

            if ( rootContent.Any() )
            {
                var homenode = rootContent.Where(x => x.Name == navigation.Name.LocalName).FirstOrDefault();

                if (homenode != null)
                {
                    // we set the guid of our import to whatever the guid is of the root.
                    // that way when usync.core imports it - it will find it and treat it 
                    // as an existing node :) 
                    navigation.Attribute("guid").Value = homenode.Key.ToString();
                    LogHelper.Info<BasicNavParser>("Setting Root Node Guid {0}", () => homenode.Key.ToString());
                }
            }

            ImportContentNode(navigation, -1);

            return importCount;
        }

        private void ImportContentNode(XElement node, int parentId)
        {
            LogHelper.Info<BasicNavParser>("Importing {0} - {1}", ()=> node.Name.ToString(), ()=> parentId);
            var content = uSyncCore.Content.Import(node, false, parentId);

            if (content != null)
            {
                importCount++;
                LogHelper.Info<BasicNavParser>("Imported {0} with id {1}", () => content.Name, () => content.Id);

                if (node.Element("Children") != null)
                {
                    var children = node.Element("Children");

                    // get all the children...
                    foreach (var child in children.Elements())
                    {
                        if ( child.Name != "Children") 
                            ImportContentNode(child, content.Id);
                    }
                }
            }
        }

        public void MakeExampleContent(int ParentNode, string filename)
        {
            var _contentService = ApplicationContext.Current.Services.ContentService;

            var parent = _contentService.GetById(ParentNode);

            if ( parent != null )
            {
                XElement allContent = ExportContent(parent);

                var savePath = IOHelper.MapPath(filename);
                if (System.IO.File.Exists(savePath))
                    System.IO.File.Delete(savePath);

                allContent.Save(savePath);
            }

        }

        private XElement ExportContent(IContent item)
        {
            LogHelper.Info<BasicNavParser>("Exporting {0}", () => item.Name);

            var node = uSyncCore.Content.Export(item);


            if (item.Children().Count() > 0)
            {
                var childHolder = new XElement("Children");

                foreach (var child in item.Children())
                {
                    var childNode = ExportContent(child);

                    childHolder.Add(childNode);
                }

                node.Add(childHolder);
            }

            return node;

        }


    }
}