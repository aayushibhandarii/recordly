import java.lang.*;
import java.util.*;

class Solution
{
	public static void main (String[] args) throws java.lang.Exception
	{
		// your code goes here
        Scanner input = new Scanner(System.in);
        int t = input.nextInt();
        while(t>0){
            int n = input.nextInt();
            int k = input.nextInt();
            int[] a = new int[n];
            Set<Integer>[] set = new Set[n+1];
            for(int i=0;i<n;i++){
                a[i] = input.nextInt();
                if(set[a[i]]==null){
                    set[a[i]] = new HashSet<>();
                }
                set[a[i]].add(i+1);
            }
            
            int size = set[1].size();
            long[] dist = new long[size];
            int j=0;
            for(int item : set[1]){
                dist[j] = helper(2,set,k,item);
                j++;
            }
            for(int s=1;s<=n;s++){
                j=0;
                long ans =Integer.MAX_VALUE;
                for(int item : set[1]){
                    ans =Math.min(ans,dist[j]+Math.abs(s-item));
                    j++;
                }
                System.out.print(ans+" ");
            }
            System.out.println();
            t--;
        }
	}
	public static long helper(int index,Set<Integer>[] set,int k,int s){
	    if(index>k){
	        return 0;
	    }
	    long ans = Integer.MAX_VALUE;
	    for(Integer item : set[index]){
	        ans = Math.min(ans,Math.abs(item-s)+helper(index+1,set,k,item));
	    }
	    return ans;
	}

}
