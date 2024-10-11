import { App ,Vault,MetadataCache} from "obsidian";

export const parseFrontmatter = async (app:App)=>{
    const files = app.vault.getFiles()
    // console.log(files)
    for (const file of files) {  
       if(file.extension=='md'){
        // console.log(file.extension)
        const cache = app.metadataCache.getFileCache(file);  
        const frontmatter = cache?.frontmatter;  
        console.log(frontmatter);  
    
        if (typeof frontmatter === "undefined") {  
            const content = await app.vault.read(file);  
            const newContent = "---\ntags:\n---\n" + content; // 注意添加换行符  
            await app.vault.modify(file, newContent);  
            console.log(`Added tag frontmatter to ${file.name}`);  
        } else {  
            const content = await app.vault.read(file);  
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);  
            if (frontmatterMatch) {  
                const frontmatterString = frontmatterMatch[0];  
                const frontmatterObj = detect(frontmatterString);  
    
                // detect "tags" key  
                if ('tags' in frontmatterObj) {  
                    console.log(frontmatter.tags)
                    // console.log(`The file ${frontmatter.tags} has "tags" in frontmatter.`);  
                } else {  
                    app.fileManager.processFrontMatter(file,(frontmatter)=>{
                        frontmatter['tags'] = []
                    })
                    // console.log(`The file ${file.name} does not have "tags" in frontmatter.`);  
                }  
            }  
        }  

        
        const content = await app.vault.read(file);  
        
        const newContent =  rmFrontmatter(content)
        const firstline = newContent.split('\n')[0]
        const tags = getFirstLineTags(firstline)
        if(tags!=null){
            console.log(`find first-line tags in ${file.name}: ${tags}`)
            const rcontent = content.replace(firstline,"")
            await app.vault.modify(file,rcontent)
            let tgl: string[] = []
            if(typeof frontmatter !="undefined"){
                tgl = frontmatter['tags']
            }else{
                tgl = []
            }
            app.fileManager.processFrontMatter(file,(frontmatter)=>{
                if(frontmatter['tags']!=null){
                    tags.forEach(tag =>{
                    
                        if(!(frontmatter['tags'].includes(tag))){
                        tgl.push(tag) 
                        }
                        
                    })
                }else{
                    tgl = tags
                }
                console.log("taget",tgl)
                frontmatter['tags'] = tgl
            })
        }
 

       }
    }
}

const detect = (frontmatter: string) =>{  
    const lines = frontmatter.split('\n');  
    const obj: Record<string, any> = {};  
    for (const line of lines) {  
        const [key, value] = line.split(':').map(part => part.trim());  
        if (key) {  
            obj[key] = value || true; // 如果没有值，设置为 true  
        }  
    }  
    return obj;  
}  

const rmFrontmatter = (content:string)=>{
    const regex = /^---\n([\s\S]*?)\n---\n*/g;  
    return(content.replace(regex,""))
}

const getFirstLineTags = (content:string)=>{
    const regex = /#\w+/g; // \w+ 匹配一个或多个字母、数字或下划线  

    // 使用 match 方法找出所有符合条件的结果  
    const matches = content.match(regex);  
    let res: string[] = []
    if (matches) {  
        matches.forEach(mat =>{
            res.push(mat.replace("#",""))
        })
        return(res); // 输出: [ '#dis', '#abs', '#lkb' ]  
    } else {  
        return(null);  
    }  
}

