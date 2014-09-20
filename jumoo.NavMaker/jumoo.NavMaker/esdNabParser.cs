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

namespace jumoo.NavMaker
{
    /// <summary>
    ///  EdsNavParser - does stuff with Esd Navigations (in xml)
    /// </summary>
    public class EsdNavParser
    {
        XElement nav = null;
        IContentService _contentService;

        private int _nodeCount;
        public int NodeCount
        {
            get { return _nodeCount; }
        }

        private string _lastError;
        public string LastError
        {
            get { return _lastError; }
        }

        public EsdNavParser()
        {
            _contentService = ApplicationContext.Current.Services.ContentService;
            _nodeCount = 0;
            _lastError = ""; 
        }

        public void Load(string xmlFile)
        {
            nav = XElement.Load(xmlFile);
        }

        public void ParseNav(bool doServices)
        {
            if (nav == null)
                throw new ApplicationException("Navigation file not loaded");

            // create a homepage..
            LogHelper.Info<EsdNavParser>("Create Homepage Here...");
            int parent = -1; 

            foreach(var node in _contentService.GetRootContent())
            {
                if (node.Name.ToLower() == "localgov home" )
                {
                    parent = node.Id ;
                    break;
                }

                // just get the node id of what ever is there..
                parent = node.Id;
                break;
            }

            if (parent != -1)
            {
                foreach (var node in nav.Elements("WebsiteNavigation"))
                {
                    ParseNode(node, "Nav", parent, doServices);
                }
            }
            else
            {
                _lastError = "Couldn't find Homepage";
            }
        }

        public void ParseNode(XElement node, string nodeType, int parentId, bool doServices)
        {
            int id = -1;
            if ( nodeType == "Nav")
            {
                string pageType = "LandingPage";
                if ((node.Element("Identifier").Value == "11") || (node.Element("Identifier").Value == "1"))
                {
                    pageType = "SectionHomepage"; //SectionHomepage
                }

                LogHelper.Info<EsdNavParser>("Create a {1} here... {0}", () => node.Element("Label").Value, () => pageType);
                id = CreateContent(pageType, node, parentId);
            }
            else
            {
                if (doServices)
                {
                    // create a content page...
                    LogHelper.Info<EsdNavParser>("Create a content page here... {0}", () => node.Element("Label").Value);
                    CreateContent("ContentPage", node, parentId);
                }
            }
            if (id != -1)
            {
                if (node.Element("Services") != null)
                {
                    foreach (var child in node.Element("Services").Elements("Service"))
                    {
                        ParseNode(child, "Service", id, doServices);
                    }
                }

                if (node.Element("WebsiteNavigation") != null)
                {
                    foreach (var child in node.Element("WebsiteNavigation").Elements("WebsiteNavigation"))
                    {
                        ParseNode(child, "Nav", id, doServices);
                    }
                }
            }
        }

        private int CreateContent(string template, XElement webNode, int parentId)
        {
            string title = webNode.Element("Label").Value ; 
            string esdId = webNode.Element("Identifier").Value;

            var node = _contentService.CreateContent(title, parentId, template);
            if (node != null)
            {
                if (node.HasProperty("title"))
                {
                    node.SetValue("title", title);
                }

                if (node.HasProperty("esdServiceId"))
                {
                    node.SetValue("esdServiceId", esdId);
                }

                if (node.HasProperty("sectionName"))
                {
                    node.SetValue("sectionName", title);
                }

                _contentService.SaveAndPublishWithStatus(node, 0, false);
                _nodeCount++; 
                return node.Id; 

            }
            _lastError = "Error Creating Content";
            return -1;
        }
    }

}